# Разбор: Zen

[[atlas/! themes/zen|Zen]] · [Репозиторий на момент проверки](https://github.com/laughmaker/Zen/tree/628d92aae4c36e27cffae3bf5d4407156c77e6af)

Commit: `628d92aae4c36e27cffae3bf5d4407156c77e6af`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 8; документов: 3; CSS-файлов: 1; правил основного CSS разобрано: 474.

## Результат сопоставления

Новых карточек: 7; ранее существовавших приёмов с найденными подтверждениями: 7.

- Обозначение уровня заголовка в редакторе — новая карточка
- Расположение меню хранилища — новая карточка
- Фоновое изображение рабочего пространства — новая карточка
- Размытие фона за всплывающими панелями — новая карточка
- Размер и форма полос прокрутки — новая карточка
- Форма и цвет курсора редактора — новая карточка
- Выделение активного файла в проводнике — новая карточка
- [[atlas/! hacks/text-justify/text-justify|Выравнивание по ширине]] — существующая карточка
- [[atlas/! hacks/heading-e019/heading-e019|Черта на всю ширину]] — существующая карточка
- [[atlas/! hacks/interface-active-tab/interface-active-tab|Выразительная активная вкладка]] — существующая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/emphasis-s02/emphasis-s02|02 · Цветной bold]] — существующая карточка
- [[atlas/! hacks/emphasis-s03/emphasis-s03|03 · Цвет вместо курсива]] — существующая карточка
- [[atlas/! hacks/table-e035/table-e035|Подсветка отдельной ячейки]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| Close left vault profile. | `close-left-vault-profile` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Расположение меню хранилища | [код](https://github.com/laughmaker/Zen/blob/628d92aae4c36e27cffae3bf5d4407156c77e6af/theme.css#L73) |
| Hide the Heading prompt in the editor. | `alt-heading-off` | Есть карточка | Подтверждено правилом CSS. Обозначение уровня заголовка в редакторе | [код](https://github.com/laughmaker/Zen/blob/628d92aae4c36e27cffae3bf5d4407156c77e6af/theme.css#L89) |
| Hide the Heading bottom line in the editor. | `heading-bottom-line-off` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/laughmaker/Zen/blob/628d92aae4c36e27cffae3bf5d4407156c77e6af/theme.css#L96) |
| Open text justification. | `text-justify` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/text-justify/text-justify\|Выравнивание по ширине]] | [код](https://github.com/laughmaker/Zen/blob/628d92aae4c36e27cffae3bf5d4407156c77e6af/theme.css#L103) |
| Close the translucent window. | `win-translucent-off` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Фоновое изображение рабочего пространства; Размытие фона за всплывающими панелями | [код](https://github.com/laughmaker/Zen/blob/628d92aae4c36e27cffae3bf5d4407156c77e6af/theme.css#L162) |

## Документация в репозитории

- [README.md](https://github.com/laughmaker/Zen/tree/628d92aae4c36e27cffae3bf5d4407156c77e6af/README.md) — Zen; Overview; Features; Requirements; Installation; Community Themes; Recommended font; Platform notes; macOS; Windows and Linux; Plugin compatibility; Support; Disclaimer; License
- [README.zh-CN.md](https://github.com/laughmaker/Zen/tree/628d92aae4c36e27cffae3bf5d4407156c77e6af/README.zh-CN.md) — Zen; 简介; 主要特性; 使用要求; 安装; 社区主题; 推荐字体; 平台说明; macOS; Windows 与 Linux; 插件适配; 支持项目; 免责声明; 许可证
- [weread.md](https://github.com/laughmaker/Zen/tree/628d92aae4c36e27cffae3bf5d4407156c77e6af/weread.md) — 元数据; 高亮划线; {{chapter.chapterTitle}}{% for highlight in chapter.highlights %}{% if highlight.reviewContent %}{% else %}; 读书笔记; {{chapter.chapterTitle}}; 章节评论; 划线评论; 本书评论

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
