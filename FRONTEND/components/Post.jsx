export default function Post({title, description, date, author,id}) {
    return (
      <div className="hover:scale-105 transition-transform duration-300 ease-in-out hover:cursor-pointer" onClick={() => window.location.href = "/post/" + id}>
        <div className="border-2 border-gray-300 rounded-md gap-2 p-4 w-96">
          <h1 className="text-3xl font-semibold pb-6">{title}</h1>
          <p className="text-gray-200 text-md font-thin">{description.slice(0,240)}.....<a className="underline">read more</a></p>
          <div className="flex justify-between mt-4">
            <p className="text-gray-300 text-sm">{new Date(date).toLocaleDateString()}</p>
            <p className="text-gray-400 left-0 text-sm">@{author}</p>
          </div>
        </div>
      </div>
    );
  }
  