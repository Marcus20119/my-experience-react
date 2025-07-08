interface Props {
  zIndex: number;
}

function OverlayLayer({ zIndex }: Props) {
  return (
    <div className="absolute inset-0" style={{ zIndex }}>
      <div className="h-full w-full bg-neutral-700/40" />
    </div>
  );
}

export default OverlayLayer;
