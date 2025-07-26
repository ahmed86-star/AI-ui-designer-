import CollaborativeMode from "@/components/collaborative-mode";

export default function Collaborate() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Real-time Collaborative Design
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Work together with your team to create amazing UI designs in real-time. 
            See cursors, share prompts, and build together.
          </p>
        </div>
        
        <CollaborativeMode />
      </div>
    </div>
  );
}