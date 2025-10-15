export default function StatCard  ({ title, value, icon: Icon, color }){
    return(
      <div className={`bg-white rounded-xl p-6 shadow-lg border-t-4 ${color}`}>
        <div className="flex items-center space-x-4">
          <Icon className="w-8 h-8 text-gray-600" />
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
      </div>
    );
};