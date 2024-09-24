export const SkeletonLoader = () => {
    return (
        <div className="animate-pulse">
            <div className="flex flex-col space-y-4">
                {/* Skeleton for each row */}
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border-b border-gray-200">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div className="flex-1">
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-300 rounded w-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};