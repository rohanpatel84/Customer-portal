import React from 'react';
import ChatCard from '../../components/Chat/ChatCard';
import TableOne from '../../components/Tables/TableOne';
import DefaultLayout from '../../layout/DefaultLayout';
import UserCard from '../../components/UserCard'

const ECommerce: React.FC = () => {
  return (
    <DefaultLayout>
        <UserCard username={''} password={''} />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">
          <TableOne username={''} password={''} />
        </div>
        <ChatCard />
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
