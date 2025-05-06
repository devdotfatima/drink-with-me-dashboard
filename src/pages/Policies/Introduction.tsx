import { useEffect, useState } from "react";
// import supabase from "../../db";

const Introduction = () => {
  const [sectionData, setSectionData] = useState({
    section_title: "",
    content: "Introduction ",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch relevant section data
  // const fetchSectionData = async () => {
  //   const { data, error } = await supabase

  //     .from("terms_conditions") // Replace with your table name
  //     .select("section_title, content")
  //     .eq("id", "028ebf3a-70f8-4c43-9aaf-25df891951df") // Fetch only "Your Rights" section
  //     .single();

  //   if (error) {
  //     console.error("Error fetching section data:", error);
  //   } else {
  //     setSectionData(data);
  //   }
  // };

  // Update section data
  // const updateSectionData = async () => {
  //   const { error } = await supabase
  //     .from("terms_conditions") // Replace with your table name
  //     .update(sectionData)
  //     .eq("id", "028ebf3a-70f8-4c43-9aaf-25df891951df");

  //   if (error) {
  //     console.error("Error updating section data:", error);
  //   } else {
  //     setIsEditing(false);
  //     fetchSectionData(); // Refresh data after update
  //   }
  // };

  useEffect(() => {
    // fetchSectionData();
  }, []);

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
  );
};

export default Introduction;
