// 10. Settings/Placeholder Page (Dynamic Page View 10)
export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-900">Application Settings</h2>
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl">
                <h3 className="text-xl font-semibold border-b pb-2 mb-4">Backend Connection Status</h3>
                <p className="text-gray-700 mb-2"><span className="font-medium">Spring Boot URL:</span> <code className="bg-gray-100 p-1 rounded">http://localhost:8080/api</code></p>
                <p className="text-green-600 font-bold flex items-center"><CheckCircle className="w-5 h-5 mr-2" /> Connection OK (Mock Data Active)</p>

                <p className="mt-4 text-sm text-gray-500">
                    This page simulates a dynamic view for configuration settings, user profiles, or advanced features that would interact with the Spring Boot backend's non-CRUD endpoints (e.g., authentication, logging, system info).
                </p>
            </div>
        </div>
    )
}
