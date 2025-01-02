interface Props<T> {
  templates: T[];
  setShuffledTemplates: React.Dispatch<React.SetStateAction<T[]>>;
  setShowAll: React.Dispatch<React.SetStateAction<boolean>>;
  showAll: boolean;
}

export default function ShowButtons<T>({
  templates,
  setShuffledTemplates,
  setShowAll,
  showAll,
}: Props<T>) {
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
  };

  const showAllTemplates = () => {
    setShuffledTemplates(shuffleArray(templates));
    setShowAll(true);
  };

  const showLessTemplates = () => {
    setShuffledTemplates(shuffleArray(templates));
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
