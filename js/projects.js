(() => {
  'use strict';

  const GITHUB_USERNAME = 'octocat';
  const REPOSITORY_LIMIT = 6;
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

  const renderProjectCards = () => state.repositories.map((repository) => {
    const {
      name,
      description,
      language,
      stargazers_count: starCount,
      html_url: repositoryUrl,
    } = repository;

    return `
      <article class="project-card">
        <h3>${escapeHtml(name)}</h3>
        <p>${escapeHtml(description || '설명이 등록되지 않은 프로젝트입니다.')}</p>
        <p>${escapeHtml(language || '언어 정보 없음')} · ★ ${Number(starCount) || 0}</p>
        <a href="${escapeHtml(getSafeRepositoryUrl(repositoryUrl))}" target="_blank" rel="noopener noreferrer">
          GitHub에서 보기
        </a>
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
      projectState.innerHTML = renderProjectCards();
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
        throw new Error('GitHub API 요청 한도에 도달했습니다. 잠시 후 다시 시도해 주세요.');
      }

      if (!response.ok) {
        throw new Error('프로젝트를 불러올 수 없습니다.');
      }

      const repositories = await response.json();

      if (!Array.isArray(repositories)) {
        throw new Error('GitHub 응답 형식을 확인할 수 없습니다.');
      }

      updateState({
        status: repositories.length > 0 ? 'success' : 'empty',
        repositories,
        errorMessage: '',
      });
    } catch (error) {
      updateState({
        status: 'error',
        repositories: [],
        errorMessage: error instanceof Error
          ? error.message
          : '프로젝트를 불러올 수 없습니다.',
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
