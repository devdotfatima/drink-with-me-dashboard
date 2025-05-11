import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const dummyReports = [
  {
    id: 1,
    reporter: "Alice Johnson",
    reportedUser: "Mark Doe",
    reason: "Sexually Offensive",
    date: "2025-05-01",
  },
  {
    id: 2,
    reporter: "Tom Watts",
    reportedUser: "Lucy Ray",
    reason: "Fake age/gender",
    date: "2025-04-28",
  },
];

const ReportManagement = () => {




  return (
    <div className="p-5">
      <h1 className="mb-4 text-2xl font-semibold">Reported Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Reporter</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Reported User</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Reason</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Date</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dummyReports.map((report) => (
              <tr key={report.id}>
                <td className="px-4 py-3 text-sm text-gray-700">{report.reporter}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{report.reportedUser}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{report.reason}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{report.date}</td>
                <td className="flex items-center gap-3 px-4 py-3">
                  <Link to={`/users/${report.id}`}  className="flex items-center gap-1 p-2 text-sm text-white rounded-lg bg-primary-200">
                    <Eye className="w-4 h-4" /> View
                  </Link>
                </td>
                 
                 
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
    </div>
  );
};

export default ReportManagement;