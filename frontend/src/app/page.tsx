import Link from "next/link";

// Mock data matching the Podcastr interface
const latestReleases = [
  {
    id: 1,
    title: "O que é um bom código?",
    hosts: "Diego e Richard",
    date: "8 Jan 21",
    duration: "1:35:18",
    image: "/api/placeholder/300/300",
    description: "Discussing what makes code good and maintainable",
  },
  {
    id: 2,
    title: "Como começar na programação",
    hosts: "Tiago, Diego e Pellizzetti",
    date: "8 Jan 21",
    duration: "35:40",
    image: "/api/placeholder/300/300",
    description: "A beginner's guide to programming",
  },
];

const allEpisodes = [
  {
    id: 1,
    title: "A vida é boa",
    hosts: "Tiago, Diego e Pellizzetti",
    date: "8 Jan 21",
    duration: "1:35:18",
    image: "/api/placeholder/100/100",
  },
  {
    id: 2,
    title: "Como programar like a god",
    hosts: "Maria, Tiago e Samuel",
    date: "7 Jan 21",
    duration: "35:40",
    image: "/api/placeholder/100/100",
  },
  {
    id: 3,
    title: "Bora viver!",
    hosts: "Diego e Richard",
    date: "12 Fev 21",
    duration: "54:27",
    image: "/api/placeholder/100/100",
  },
  {
    id: 4,
    title: "Não desista de você",
    hosts: "Pelpas, Pulili, Pepe e Pupa",
    date: "24 Mar 21",
    duration: "1:27:11",
    image: "/api/placeholder/100/100",
  },
  {
    id: 5,
    title: "A vida é incrível",
    hosts: "B1 e B2 descendo as escadas",
    date: "25 Mar 21",
    duration: "1:35:18",
    image: "/api/placeholder/100/100",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-sm text-gray-500 mb-6">Home (nada tocando)</div>

      {/* Latest Releases Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Últimos lançamentos
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {latestReleases.map((episode) => (
            <div
              key={episode.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-4xl text-white opacity-80">🎙️</span>
                </div>
                <div className="flex-1 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {episode.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{episode.hosts}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    {episode.date} • {episode.duration}
                  </p>
                  <button className="text-green-600 hover:text-green-700 transition-colors">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Episodes Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Todos os episódios
        </h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
              <div className="col-span-5">PODCAST</div>
              <div className="col-span-3">INTEGRANTES</div>
              <div className="col-span-2">DATA</div>
              <div className="col-span-2">DURAÇÃO</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {allEpisodes.map((episode) => (
              <div
                key={episode.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5 flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded flex items-center justify-center">
                      <span className="text-lg text-white opacity-80">🎙️</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {episode.title}
                    </span>
                  </div>
                  <div className="col-span-3 text-sm text-gray-600">
                    {episode.hosts}
                  </div>
                  <div className="col-span-2 text-sm text-gray-500">
                    {episode.date}
                  </div>
                  <div className="col-span-2 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {episode.duration}
                    </span>
                    <button className="text-green-600 hover:text-green-700 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
