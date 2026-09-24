// Keep numeric editing and persistence tests independent of mutable atlas recipes.
export const numericParameterCss = `.markdown-preview-view p {
  /**
   * @parameter Font size
   * @type number
   * @default 4em
   * @unit em
   * @min 2
   * @max 8
   * @step 0.1
   */
  --hacksidian-test-size: 4em;
  font-size: var(--hacksidian-test-size);
}`;
