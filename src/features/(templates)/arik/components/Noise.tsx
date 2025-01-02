export default function Noise({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`} {...props}>
      {children}
      <div className="absolute inset-0 bg-noise bg-cover bg-no-repeat bg-center"></div>
    </div>
  );
}
