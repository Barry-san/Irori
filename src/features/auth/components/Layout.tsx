type layoutProps = {
  title: string;
  children: React.ReactNode;
};
export const AuthLayout = (props: layoutProps) => {
  return (
    <div className="bg-white w-full min-h-screen flex flex-col gap-4 justify-center items-center">
      <p className="text-center text-lg ">{props.title}</p>
      {props.children}
    </div>
  );
};
