/**
 * Модуль для управления табами и аккордеонами в секции FAQ
 */
export const initFaqTabsAccordions = () => {
  const tabButtons = document.querySelectorAll('.faq__tab-button');
  const tabLists = document.querySelectorAll('.faq__tab-list');
  const accordionButtons = document.querySelectorAll('.faq__ask-button');

  if (!tabButtons.length || !tabLists.length) return;

  // Объект для хранения состояний аккордеонов
  const tabAccordionStates = {
    'tab-center': [],
    'tab-season-ticket': [],
    'tab-services': [],
    'tab-rules': []
  };

  // Переключение таба
  const switchTab = (tabId) => {
    tabButtons.forEach((button) => {
      const isActive = button.getAttribute('data-tab') === `#${tabId}`;
      button.classList.toggle('faq__tab-button--active', isActive);
      button.setAttribute('aria-selected', isActive);
    });

    tabLists.forEach((item) => {
      const isActive = item.getAttribute('data-tab') === tabId;
      item.classList.toggle('faq__tab-list--active', isActive);
      item.setAttribute('aria-hidden', !isActive);
    });
  };

  // Переключение аккордеона
  const toggleAccordion = (accordionItem, index, tabId, forceOpen = false) => {
    const button = accordionItem.querySelector('.faq__ask-button');
    if (!button) return;

    const shouldOpen = forceOpen || !tabAccordionStates[tabId][index];
    tabAccordionStates[tabId][index] = shouldOpen;

    button.classList.toggle('faq__ask-button--active', shouldOpen);
    button.setAttribute('aria-expanded', shouldOpen);
    // Стили управляются через CSS с помощью класса faq__ask-button--active
  };

  // Инициализация всего
  const init = () => {
    // Событие клика на вкладках
    tabButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab').replace('#', '');
        if (tabId) switchTab(tabId);
      });

      // Поддержка клавиатуры
      button.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          button.click();
        }
      });
    });

    // Клик по заголовку аккордеона
    document.querySelectorAll('.faq__ask-item > div').forEach((heading) => {
      heading.addEventListener('click', (event) => {
        if (!event.target.closest('.faq__ask-button')) {
          heading.querySelector('.faq__ask-button')?.click();
        }
      });
    });

    // Клик по кнопке аккордеона
    accordionButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();

        const accordionItem = button.closest('.faq__ask-item');
        const tabList = button.closest('.faq__tab-list');
        if (!accordionItem || !tabList) return;

        const tabId = tabList.getAttribute('data-tab');
        const accordionItems = tabList.querySelectorAll('.faq__ask-item');
        const index = Array.from(accordionItems).indexOf(accordionItem);

        if (index !== -1 && tabId) {
          toggleAccordion(accordionItem, index, tabId);
        }
      });

      // Поддержка клавиатуры
      button.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          button.click();
        }
      });
    });

    // Установка ARIA атрибутов и инициализация
    const tabList = document.querySelector('.faq__tab-toggles');
    if (tabList) {
      tabList.setAttribute('role', 'tablist');

      // Настройка табов
      tabButtons.forEach((button, index) => {
        const id = `tab-button-${index}`;
        const tabId = button.getAttribute('data-tab').replace('#', '');

        button.setAttribute('role', 'tab');
        button.setAttribute('id', id);
        button.setAttribute('aria-controls', `tab-panel-${tabId}`);
        button.setAttribute('aria-selected', button.classList.contains('faq__tab-button--active'));
        button.setAttribute('tabindex', button.classList.contains('faq__tab-button--active') ? '0' : '-1');
      });

      // Настройка панелей табов
      tabLists.forEach((tabPanel, index) => {
        const tabId = tabPanel.getAttribute('data-tab');

        tabPanel.setAttribute('role', 'tabpanel');
        tabPanel.setAttribute('id', `tab-panel-${tabId}`);
        tabPanel.setAttribute('aria-labelledby', `tab-button-${index}`);
        tabPanel.setAttribute('aria-hidden', !tabPanel.classList.contains('faq__tab-list--active'));
      });
    }

    // Настройка аккордеонов
    document.querySelectorAll('.faq__tab-list').forEach((tabList) => {
      const tabId = tabList.getAttribute('data-tab');
      const accordions = tabList.querySelectorAll('.faq__ask-item');
      tabAccordionStates[tabId] = Array.from(accordions).map(() => false);

      accordions.forEach((accordionItem, index) => {
        const content = accordionItem.querySelector(':scope > p');
        const button = accordionItem.querySelector('.faq__ask-button');
        const heading = accordionItem.querySelector('div');

        if (!content || !button || !heading) return;

        const headingText = heading.querySelector('span') || heading.querySelector('p');
        const headingId = `accordion-heading-${tabId}-${index}`;
        const contentId = `accordion-content-${tabId}-${index}`;
        const isActiveTab = tabList.classList.contains('faq__tab-list--active');
        const isFirstAccordion = isActiveTab && index === 0;

        if (headingText) headingText.setAttribute('id', headingId);

        button.setAttribute('aria-controls', contentId);
        button.setAttribute('aria-expanded', isFirstAccordion);

        // Открываем первый аккордеон в активном табе
        if (isFirstAccordion) {
          button.classList.add('faq__ask-button--active');
          tabAccordionStates[tabId][0] = true;
        }

        content.setAttribute('id', contentId);
        content.setAttribute('aria-labelledby', headingId);
        content.setAttribute('role', 'region');
      });
    });
  };

  init();
};
