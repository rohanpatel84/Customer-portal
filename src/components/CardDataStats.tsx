import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: string;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,

}) => {


  return (
    <div className="rounded-2xl border border-white bg-white py-6 px-7.5 shadow-md">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 ">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {total}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>
    </div>
    
  );
};

export default CardDataStats;
