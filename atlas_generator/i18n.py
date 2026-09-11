"""Build-time interface dictionaries. Example content is never translated here."""
from html import escape
import re

STRINGS = {
    'title': ('Hacksidian — атлас приёмов', 'Hacksidian — technique atlas'),
    'atlas': ('Атлас приёмов', 'Technique atlas'),
    'back': ('← К списку', '← Back to list'),
    'catalogue': ('Каталог приёмов', 'Technique catalogue'),
    'find': ('Найти приём', 'Find a technique'),
    'search_placeholder': ('Название, свойство CSS, содержание…', 'Title, CSS property, content…'),
    'group': ('Группа', 'Group'), 'all_groups': ('Все группы', 'All groups'),
    'digest': ('Дайджест', 'Digest'), 'digests': ('Дайджесты', 'Digests'), 'all_digests': ('Все дайджесты', 'All digests'),
    'format': ('Формат', 'Format'), 'all_formats': ('Все форматы', 'All formats'),
    'interaction': ('Движение и взаимодействие', 'Motion and interaction'),
    'interaction_hint': ('Взаимодействие, прокрутка или автоматическая анимация', 'Interaction, scrolling, or automatic animation'),
    'all_techniques': ('Все приёмы', 'All techniques'),
    'interactive_plural': ('Интерактивные', 'Interactive'), 'static_plural': ('Статические', 'Static'),
    'interactive': ('Интерактивный', 'Interactive'), 'static': ('Статический', 'Static'),
    'permalink': ('Постоянная ссылка на подборку', 'Permanent link to this collection'),
    'results': ('Результаты поиска', 'Search results'),
    'empty': ('Ничего не найдено. Попробуйте другой запрос или сбросьте фильтры.', 'Nothing found. Try another query or reset the filters.'),
    'filtered': ('Отфильтрованные приёмы', 'Filtered techniques'),
    'empty_feed': ('Нет приёмов, соответствующих фильтрам.', 'No techniques match the filters.'),
    'load_more': ('Загрузить следующие приёмы', 'Load more techniques'),
    'total': ('{count} приёмов · {groups} групп', '{count} techniques · {groups} groups'),
    'found': ('{count} найдено', '{count} found'),
    'purpose': ('Зачем', 'Purpose'), 'how': ('Как работает', 'How it works'),
    'action': ('Действие', 'Action'), 'limitations': ('Ограничения', 'Limitations'), 'description': ('Описание', 'Description'),
    'original_model': ('Исходная HTML-модель ↗', 'Original HTML model ↗'),
    'open_obsidian': ('Открыть этот приём в Obsidian', 'Open this technique in Obsidian'),
    'demonstration': ('Демонстрация', 'Demonstration'), 'open_example': ('Открыть пример ↗', 'Open example ↗'),
    'resize': ('Высоту области можно менять за нижний край', 'Drag the bottom edge to resize the preview'),
    'details': ('Описание и исходники', 'Description and source'),
    'download': ('Скачать {file}', 'Download {file}'), 'sources': ('Источники', 'Sources'),
    'technique_sources': ('Источники приёма', 'Technique sources'), 'category_sources': ('Источники категории', 'Category sources'),
    'source_example': ('Исходный пример', 'Source example'), 'no_sources': ('В картотеке источник не указан.', 'No source is specified in the catalogue.'),
    'link_targets': ('Цели ссылок примера', 'Example link targets'), 'link_target': ('Цель ссылки: {target}', 'Link target: {target}'),
    'return_example': ('Вернуться к примеру', 'Return to example'),
}
SECTION_NAMES = {
    'ru': {'purpose': 'Зачем', 'how': 'Как работает', 'action': 'Демонстрация', 'limitations': 'Ограничения исходного приёма', 'description': 'Пояснения из HTML-атласа', 'sources': 'Источники'},
    'en': {'purpose': 'Purpose', 'how': 'How it works', 'action': 'Demonstration', 'limitations': 'Limitations of the original technique', 'description': 'Notes from the HTML atlas', 'sources': 'Sources'},
}


def normalize_language(value):
    return 'ru' if str(value or '').lower().split('-')[0].split('_')[0] == 'ru' else 'en'


def strings(language):
    if language not in ('ru', 'en'):
        raise ValueError('Language must be ru or en')
    return {key: value[language == 'en'] for key, value in STRINGS.items()}


def tr(language, key, **parameters):
    return strings(language)[key].format(**parameters)


def localize_shell(source, language):
    return re.sub(r'\{\{i18n:([a-z_]+)\}\}', lambda m: escape(tr(language, m[1]), quote=True), source).replace('{{language}}', language)
