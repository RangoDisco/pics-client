const PictureSkeleton = () => {
  return (
    <article className="w-full h-96 bg-raisinBlack shadow-lg rounded-md">
      <div className="w-full h-3/4 relative bg-davysGray rounded-t-md animate-pulse" />
      <div className="h-6 rounded-full m-4">
        <div className="mt-2 bg-davysGray rounded-full h-4 w-1/2 animate-pulse" />
        <div className="ml-1 mt-3 bg-davysGray rounded-full h-2 w-1/4 animate-pulse" />
        <div className="ml-1 mt-2 bg-davysGray rounded-full h-2 w-1/4 animate-pulse" />
      </div>
    </article>
  );
};

export default PictureSkeleton;
