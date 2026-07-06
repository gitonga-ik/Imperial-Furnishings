export function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest text-[#555]">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full border border-[#d6cfc5] rounded-lg px-4 py-2.5 text-sm
                  bg-white text-[#2b2b2b] placeholder-[#bbb]
                  focus:outline-none focus:ring-2 focus:ring-[#c05a2a] focus:border-transparent
                  transition ${className}`}
      {...props}
    />
  );
}

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      rows={4}
      className={`w-full border border-[#d6cfc5] rounded-lg px-4 py-2.5 text-sm
                  bg-white text-[#2b2b2b] placeholder-[#bbb] resize-y
                  focus:outline-none focus:ring-2 focus:ring-[#c05a2a] focus:border-transparent
                  transition ${className}`}
      {...props}
    />
  );
}

export function Select({ children, className = "", ...props }) {
  return (
    <select
      className={`w-full border border-[#d6cfc5] rounded-lg px-4 py-2.5 text-sm
                  bg-white text-[#2b2b2b]
                  focus:outline-none focus:ring-2 focus:ring-[#c05a2a] focus:border-transparent
                  transition ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function SubmitButton({ children, loading = false }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex items-center gap-2 bg-[#c05a2a] text-white
                 px-7 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider
                 hover:bg-[#a64d24] transition-colors duration-200
                 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <svg
            className="animate-spin w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          Saving…
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-[#e8e0d5] p-6 md:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ children }) {
  return (
    <h2 className="font-playfair text-2xl font-semibold text-[#2b2b2b] mb-6">
      {children}
    </h2>
  );
}
