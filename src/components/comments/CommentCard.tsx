type comment = {
  author: string;
  body: string;
  date: string;
};

const CommentCard = ({ author, body, date }: comment) => {
  return (
    <div className="md:w-2/5 mx-auto border-y border-black p-4 flex-col flex gap-4">
      <div className="flex justify-between">
        <p className="text-sm">{author}</p>
        <p className="text-xs">{date}</p>
      </div>
      <p className="font-body">{body}</p>
    </div>
  );
};

export default CommentCard;
