interface ErrorScreenProps {
  message: string;
}

export function ErrorScreen({ message }: ErrorScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
      <div className="max-w-sm w-full text-center">
        <div className="w-16 h-16 border border-neutral-200 flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">!</span>
        </div>

        <h1 className="text-xl font-medium text-black mb-3">
          오류가 발생했습니다
        </h1>

        <p className="text-neutral-500">
          {message}
        </p>
      </div>
    </div>
  );
}
