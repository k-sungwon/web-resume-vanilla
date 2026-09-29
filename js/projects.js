(() => {
  'use strict';

  const GITHUB_USERNAME = 'k-sungwon';
  const REPOSITORY_LIMIT = 100;
  const GENERIC_ERROR_MESSAGE = '프로젝트를 불러올 수 없습니다.';
  const RATE_LIMIT_ERROR_MESSAGE = 'GitHub API 요청 한도에 도달했습니다. 잠시 후 다시 시도해 주세요.';
  const PROJECT_EDITORIAL = [
    {
      repoName: 'web-resume-vanilla',
      displayTitle: '웹의 기본기를 다시 세운 SNN 자기소개서',
      interviewSummary: '프레임워크 없이 HTML, CSS, JavaScript의 역할을 직접 나누고, 브라우저에서 보이는 화면이 배포까지 이어지는 전 과정을 다시 확인했습니다.',
      imageSrc: 'images/projects/web-resume-vanilla-readme.png',
      imageAlt: 'web-resume-vanilla 저장소 README 상단 미리보기',
    },
    {
      repoName: 'codyssey_mission3',
      displayTitle: '완성과 이해 사이에서 다시 본 Tiny NPU',
      interviewSummary: '설계를 꼼꼼히 했어도 완성된 코드의 흐름을 제 언어로 설명하지 못하면 배움이 끝난 것이 아니라는 사실을 깨달은 프로젝트입니다.',
      imageSrc: 'images/projects/codyssey-mission3-readme.png',
      imageAlt: 'codyssey_mission3 Mini NPU 시뮬레이터 README 상단 미리보기',
    },
    {
      repoName: 'codyssey_mission2',
      displayTitle: 'Python 클래스 분리보다 먼저 답해야 했던 질문',
      interviewSummary: '기능을 클래스로 나누는 데서 멈추지 않고, 왜 그 구조를 선택했는지 설명할 수 있어야 한다는 기준을 얻은 퀴즈 게임입니다.',
      imageSrc: 'images/projects/codyssey-mission2-readme.png',
      imageAlt: 'codyssey_mission2 Python 퀴즈 게임 README 상단 미리보기',
    },
    {
      repoName: 'codyssey_misson1',
      displayTitle: 'Shell과 Docker에서 발견한 도구의 역사',
      interviewSummary: 'touch의 본래 역할이 timestamp 갱신이라는 사실에서 도구의 역사를 발견하고, Docker를 다음 과제의 Python 버전 문제에 곧바로 적용했습니다.',
      imageSrc: 'images/projects/codyssey-misson1-readme.png',
      imageAlt: 'codyssey_misson1 Shell과 Docker 워크스테이션 README 상단 미리보기',
    },
  ];
  const projectState = document.querySelector('#project-state');

  if (!projectState) {
    return;
  }

  const state = {
    status: 'idle',
    repositories: [],
    errorMessage: '',
  };

  const escapeHtml = (value) => String(value ?? '').replace(
    /[&<>"']/g,
    (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    })[character],
  );

  const getSafeRepositoryUrl = (value) => {
    try {
      const url = new URL(value);

      if (url.protocol === 'https:' && url.hostname === 'github.com') {
        return url.href;
      }
    } catch {
      // Fall through to the known-safe profile URL.
    }

    return `https://github.com/${GITHUB_USERNAME}`;
  };

  const formatUpdatedAt = (value) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return '업데이트 정보 없음';
    }

    return `${new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date)} 업데이트`;
  };

  const mergeEditorialProjects = (repositories) => PROJECT_EDITORIAL.map((editorial) => {
    const repository = repositories.find(({ name }) => name === editorial.repoName);

    if (!repository) {
      return null;
    }

    const {
      description,
      language,
      stargazers_count: starCount,
      html_url: repositoryUrl,
      updated_at: updatedAt,
    } = repository;

    return {
      ...editorial,
      description: description || '설명이 등록되지 않은 프로젝트입니다.',
      language: language || '언어 정보 없음',
      starCount: Number(starCount) || 0,
      repositoryUrl: getSafeRepositoryUrl(repositoryUrl),
      updatedAt,
    };
  }).filter(Boolean);

  const renderProjectArticles = () => state.repositories.map((repository, index) => {
    const {
      displayTitle,
      interviewSummary,
      imageSrc,
      imageAlt,
      description,
      language,
      starCount,
      repositoryUrl,
      updatedAt,
    } = repository;

    return `
      <article class="project-card${index === 0 ? ' project-card-featured' : ''}">
        <div class="project-media">
          <img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(imageAlt)}" width="1200" height="675" loading="lazy">
        </div>
        <div class="project-copy">
          <p class="eyebrow">PROJECT INTERVIEW ${String(index + 1).padStart(2, '0')}</p>
          <h3>${escapeHtml(displayTitle)}</h3>
          <p>${escapeHtml(interviewSummary)}</p>
          <p>${escapeHtml(description)}</p>
          <p class="project-meta">${escapeHtml(language)} · ★ ${starCount} · ${escapeHtml(formatUpdatedAt(updatedAt))}</p>
          <a href="${escapeHtml(repositoryUrl)}" target="_blank" rel="noopener noreferrer">
            GitHub에서 기사 원문 보기
          </a>
        </div>
      </article>
    `;
  }).join('');

  const renderProjects = () => {
    projectState.classList.toggle('project-grid', state.status === 'success');

    if (state.status === 'loading') {
      projectState.innerHTML = '<p>프로젝트를 불러오는 중...</p>';
      return;
    }

    if (state.status === 'empty') {
      projectState.innerHTML = '<p>표시할 프로젝트가 없습니다.</p>';
      return;
    }

    if (state.status === 'error') {
      projectState.innerHTML = `
        <div>
          <p>${escapeHtml(state.errorMessage)}</p>
          <button class="project-retry" type="button">다시 시도</button>
        </div>
      `;
      return;
    }

    if (state.status === 'success') {
      projectState.innerHTML = renderProjectArticles();
    }
  };

  const updateState = (nextState) => {
    Object.assign(state, nextState);
    renderProjects();
  };

  const loadRepositories = async () => {
    updateState({ status: 'loading', repositories: [], errorMessage: '' });

    try {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${REPOSITORY_LIMIT}`,
      );

      if (response.status === 403) {
        throw new Error(RATE_LIMIT_ERROR_MESSAGE);
      }

      if (!response.ok) {
        throw new Error(GENERIC_ERROR_MESSAGE);
      }

      const repositories = await response.json();

      if (!Array.isArray(repositories)) {
        throw new Error('GitHub 응답 형식을 확인할 수 없습니다.');
      }

      const mergedProjects = mergeEditorialProjects(repositories);

      updateState({
        status: mergedProjects.length > 0 ? 'success' : 'empty',
        repositories: mergedProjects,
        errorMessage: '',
      });
    } catch (error) {
      updateState({
        status: 'error',
        repositories: [],
        errorMessage: error instanceof Error && error.message === RATE_LIMIT_ERROR_MESSAGE
          ? RATE_LIMIT_ERROR_MESSAGE
          : GENERIC_ERROR_MESSAGE,
      });
    }
  };

  projectState.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('.project-retry')) {
      loadRepositories();
    }
  });

  loadRepositories();
})();
