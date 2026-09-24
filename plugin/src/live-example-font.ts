interface Owner { register(dispose: () => void): void }

/** Attached demo font only; never replaces the font of an installed technique. */
export async function loadPreviewFont(sample: HTMLElement, file: string, readBinary: (file: string) => Promise<ArrayBuffer>, owner: Owner): Promise<void> {
  if (!/^assets\/[a-zA-Z0-9_-]+\.(?:ttf|otf|woff2?)$/.test(file)) throw new Error('Invalid attached preview font');
  const doc = sample.ownerDocument;
  const fonts = doc.fonts as FontFaceSet & { add(face: FontFace): FontFaceSet; delete(face: FontFace): boolean };
  const Font = (doc.defaultView as unknown as { FontFace: typeof FontFace }).FontFace;
  let stopped = false;
  let face: FontFace | undefined;
  owner.register(() => { stopped = true; if (face) fonts.delete(face); });
  const bytes = await readBinary(file);
  if (stopped) return;
  face = new Font(`${sample.id}-font`, bytes);
  await face.load();
  if (stopped) return;
  fonts.add(face);
  sample.style.setProperty('--font-monospace', JSON.stringify(face.family));
}
