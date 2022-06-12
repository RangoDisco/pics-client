const CollectionSkeleton = () => {
  return (
    <article className="w-full h-96 transition-colors duration-200 hover:cursor-pointer overflow-hidden">
      <div className="w-full h-3/4 flex flex-row">
        {[0, 1, 2].map((index: number) => (
          <div
            className={`w-1/3 h-full relative border border-solid bg-creme dark:bg-davysGray border-silk dark:border-raisinBlack rounded-lg animate-pulse ${
              index === 0 ? "z-0 mt-5" : index === 1 ? "z-0 w-2/4" : "z-0 mt-5"
            }`}
            key={index}
          ></div>
        ))}
      </div>
      <div className="px-4 -mt-20 relative z-30">
        <div className="bg-raisinBlack p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <span className="bg-creme dark:bg-davysGray animate-pulse text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide h-4 w-1/5" />
            {[0, 1].map((index) => (
              <div
                className="ml-2 uppercase text-xs font-semibold tracking-wider bg-creme dark:bg-davysGray animate-pulse h-3 w-1/6 rounded-full"
                key={index}
              />
            ))}
          </div>

          <div className="mt-2 bg-creme dark:bg-davysGray animate-pulse h-6 rounded-full w-2/5" />

          <div className="mt-2 h-2 bg-creme dark:bg-davysGray animate-pulse w-1/5 rounded-full" />
          <div className="mt-2 h-10 bg-creme dark:bg-davysGray animate-pulse w-4/5 rounded-lg" />
          <div className="w-full flex justify-end" />
        </div>
      </div>
    </article>
  );
};

export default CollectionSkeleton;
