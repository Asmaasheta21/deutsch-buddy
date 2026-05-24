export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="section-container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="font-semibold text-gray-700">Deutsch Buddy</span>
          </div>
          <p className="text-sm text-gray-500">
            Learn German one tiny step at a time 🇩🇪
          </p>
          <p className="text-sm text-gray-400">
            Built with ❤️ for A1 learners
          </p>
        </div>
      </div>
    </footer>
  );
}
