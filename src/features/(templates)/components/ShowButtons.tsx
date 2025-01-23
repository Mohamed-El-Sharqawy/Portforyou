interface Props<T> {
  templates: T[];
  setShowAll: React.Dispatch<React.SetStateAction<boolean>>;
  showAll: boolean;
  setTemplates: React.Dispatch<React.SetStateAction<T[]>>;
}

export default function ShowButtons<T>({
  templates,
  setShowAll,
  showAll,
  setTemplates,
}: Props<T>) {
  const showAllTemplates = () => {
    setTemplates(templates);
    setShowAll(true);
  };

  const showLessTemplates = () => {
    setTemplates(templates.slice(0, 3));
    setShowAll(false);
  };

  return (
    <>
      {!showAll && templates.length > 3 && (
        <div className="text-center mt-12">
          <button
            onClick={showAllTemplates}
            aria-label="Submit to send us email. So, we can contact you"
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/75"
          >
            See More
          </button>
        </div>
      )}

      {showAll && templates.length > 3 && (
        <div className="text-center mt-12">
          <button
            onClick={showLessTemplates}
            aria-label="Submit to send us email. So, we can contact you"
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/75"
          >
            See Less
          </button>
        </div>
      )}
    </>
  );
}
