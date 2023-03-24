export default function Perks({ selected, onChange }) {
  function checkBoxHandler(ev) {
    const { checked, name } = ev.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  }

  return (
    <>
      <label className="text-2xl mt-4 ">Perks</label>
      <div className="grid mt-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("tv")}
            onChange={checkBoxHandler}
            name="tv"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          <span>TV</span>
        </label>

        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("playstation")}
            onChange={checkBoxHandler}
            name="playstation"
            className="text-sm"
          />
          <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            height="1.5em"
            width="1.5em"
          >
            <path d="M15.858 11.451c-.313.395-1.079.676-1.079.676l-5.696 2.046v-1.509l4.192-1.493c.476-.17.549-.412.162-.538-.386-.127-1.085-.09-1.56.08l-2.794.984v-1.566l.161-.054s.807-.286 1.942-.412c1.135-.125 2.525.017 3.616.43 1.23.39 1.368.962 1.056 1.356zM9.625 8.883v-3.86c0-.453-.083-.87-.508-.988-.326-.105-.528.198-.528.65v9.664l-2.606-.827V2c1.108.206 2.722.692 3.59.985 2.207.757 2.955 1.7 2.955 3.825 0 2.071-1.278 2.856-2.903 2.072zm-8.424 3.625C-.061 12.15-.271 11.41.304 10.984c.532-.394 1.436-.69 1.436-.69l3.737-1.33v1.515l-2.69.963c-.474.17-.547.411-.161.538.386.126 1.085.09 1.56-.08l1.29-.469v1.356l-.257.043a8.454 8.454 0 01-4.018-.323z" />
          </svg>
          <span>Playstation</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("wifi")}
            onChange={checkBoxHandler}
            name="wifi"
            className="text-sm"
          />
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1.5em"
            width="1.5em"
          >
            <path d="M12 12c-2.03 0-3.9.67-5.4 1.8l-1.8-2.4C6.81 9.89 9.3 9 12 9s5.19.89 7.2 2.4l-1.28 1.7c-.37.07-.74.17-1.08.31C15.44 12.5 13.78 12 12 12m9-3l1.8-2.4C19.79 4.34 16.05 3 12 3S4.21 4.34 1.2 6.6L3 9c2.5-1.88 5.62-3 9-3s6.5 1.12 9 3m-9 6c-1.35 0-2.6.45-3.6 1.2L12 21l1.04-1.39c-.04-.2-.04-.4-.04-.61 0-1.34.44-2.57 1.19-3.57-.69-.27-1.42-.43-2.19-.43m5.75 4.43l-1.59-1.59L15 19l2.75 3 4.75-4.75-1.16-1.41-3.59 3.59z" />
          </svg>
          <span>Wifi</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("guests")}
            onChange={checkBoxHandler}
            name="guests"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            />
          </svg>

          <span>Guests Allowed</span>
        </label>

        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("pets")}
            onChange={checkBoxHandler}
            name="pets"
          />
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1.5em"
            width="1.5em"
          >
            <path d="M18 4c-1.71 0-2.75.33-3.35.61C13.88 4.23 13 4 12 4s-1.88.23-2.65.61C8.75 4.33 7.71 4 6 4c-3 0-5 8-5 10 0 .83 1.32 1.59 3.14 1.9.64 2.24 3.66 3.95 7.36 4.1v-4.28c-.59-.37-1.5-1.04-1.5-1.72 0-1 2-1 2-1s2 0 2 1c0 .68-.91 1.35-1.5 1.72V20c3.7-.15 6.72-1.86 7.36-4.1C21.68 15.59 23 14.83 23 14c0-2-2-10-5-10M4.15 13.87c-.5-.12-.89-.26-1.15-.37.25-2.77 2.2-7.1 3.05-7.5.54 0 .95.06 1.32.11-2.1 2.31-2.93 5.93-3.22 7.76M9 12a1 1 0 01-1-1c0-.54.45-1 1-1a1 1 0 011 1c0 .56-.45 1-1 1m6 0a1 1 0 01-1-1c0-.54.45-1 1-1a1 1 0 011 1c0 .56-.45 1-1 1m4.85 1.87c-.29-1.83-1.12-5.45-3.22-7.76.37-.05.78-.11 1.32-.11.85.4 2.8 4.73 3.05 7.5-.25.11-.64.25-1.15.37z" />
          </svg>
          <span>Pets Allowed</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("smoking")}
            onChange={checkBoxHandler}
            name="smoking"
            className="text-sm"
          />
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1.5em"
            width="1.5em"
          >
            <path d="M2 6l7 7H2v3h10l7 7 1.25-1.25-17-17L2 6m18.5 7H22v3h-1.5v-3M18 13h1.5v3H18v-3m.85-8.12c.62-.61 1-1.45 1-2.38h-1.5c0 1-.85 1.85-1.85 1.85v1.5c2.24 0 4 1.83 4 4.07V12H22V9.92c0-2.23-1.28-4.15-3.15-5.04M14.5 8.7h1.53c1.05 0 1.97.74 1.97 2.05V12h1.5v-1.59c0-1.8-1.6-3.16-3.47-3.16H14.5c-1 0-1.85-.98-1.85-2S13.5 3.5 14.5 3.5V2a3.35 3.35 0 00-3.35 3.35A3.35 3.35 0 0014.5 8.7m2.5 7.23V13h-2.93L17 15.93z" />
          </svg>

          <span>No Smoking</span>
        </label>
      </div>
    </>
  );
}
