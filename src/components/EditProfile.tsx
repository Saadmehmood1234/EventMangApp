import React from 'react'

const EditProfile = () => {
  return (
    <div>
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Edit Participant</h2>
            <div>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="fullname"
                
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
              <label className="block mb-2">Enrollment</label>
              <input
                type="text"
                name="enrollment"
       
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
              <label className="block mb-2">Course</label>
              <input
                type="text"
                name="course"

                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
              <label className="block mb-2">Semester</label>
              <input
                type="text"
                name="semester"

                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
              <label className="block mb-2">Gender</label>
              {/* <input
                type="text"
                name="gender"
                value={formData?.gender || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              /> */}
              <div className="flex justify-end gap-4">
                <button
           
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  // onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default EditProfile