import { useState } from "react";

const Privacy = () => {
    const [sectionData, setSectionData] = useState({
      section_title: "",
      content: "Privacy Policy ",
    });
    const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="w-full ">


      {!isEditing ? (
        <>
          <p className="mb-6 text-gray-700">{sectionData.content}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 font-semibold text-white transition bg-red-600 rounded-lg hover:bg-red-700"
          >
            Edit
          </button>
        </>
      ) : (
        <>
          <textarea
            value={sectionData.content}
            onChange={(e) =>
              setSectionData({ ...sectionData, content: e.target.value })
            }
            className="w-full h-40 p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-4">
            <button
              // onClick={updateSectionData}
              className="px-4 py-2 font-semibold text-white transition rounded-lg bg-primary-200 hover:bg-primary-300"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 font-semibold text-gray-800 transition bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Privacy