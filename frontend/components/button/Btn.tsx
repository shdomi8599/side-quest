import React, { ReactNode } from 'react';

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const Btn = (props: Props) => {
  return <button className="search-btn" {...props} />;
};

export default Btn;
