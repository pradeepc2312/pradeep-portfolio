function renderInline(text: string, blockKey: number): (string | JSX.Element)[] {
  const pieces = text.split(/(\*\*[^*]+\*\*)/g);
  return pieces.map((piece, i) => {
    if (piece.startsWith('**') && piece.endsWith('**')) {
      return (
        <strong key={`${blockKey}-s-${i}`} className="text-fg">
          {piece.slice(2, -2)}
        </strong>
      );
    }
    return piece;
  });
}

type RichBodyProps = {
  text: string;
  paragraphClassName: string;
};

export function RichBody({ text, paragraphClassName }: RichBodyProps): JSX.Element {
  const blocks = text.trim().split(/\n\n+/);
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <p key={`p-${i}`} className={paragraphClassName}>
          {renderInline(block, i)}
        </p>
      ))}
    </div>
  );
}
