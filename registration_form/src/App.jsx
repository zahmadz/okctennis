import { useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import TennisImage from './assets/tennis.png';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function App() {
  const [levels, setLevels] = useState([
    '2.0',
    '2.5 - 3.0 ',
    '3.0 - 3.5',
    '4.0 - plus',
  ]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [level, setLevel] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);
  const isInvalidInput = !firstName || !lastName || !level || !phone;

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      firstName,
      lastName,
      level,
      email,
      phone,
    };

    console.log(payload);

    fetch('http://localhost:1233/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setFirstName('');
        setLastName('');
        setLevel('');
        setEmail('');
        setPhone('');
        setIsSuccess(true);
      })
      .catch((err) => console.log(err.message));
  }

  return isSuccess ? (
    <div className="relative min-h-screen w-full bg-gray-900 flex justify-center items-center p-4 sm:p-0 text-center">
      <div className="md:w-2/3 lg:w-1/2">
        <p className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Registration Success !
        </p>
        <p className="mt-6 text-base leading-7 text-white">
          Thank you for signing up for the Dare Doubles Tennis Tournament.
        </p>
        <p className="mt-6 text-base leading-7 text-white">
          Please text Aaron at{' '}
          <span className="font-bold text-orange-500">405-370-5610</span>
        </p>
        <div className="mt-8">
          <button
            onClick={() => setIsSuccess(false)}
            type="button"
            className="inline-flex rounded-md bg-blue-700 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Go Back to Registration Form
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="relative bg-gray-900 grid grid-cols-1 md:grid-cols-2 gap-8 justify-between items-start">
      <div className="p-10 sm:p-20">
        <div className="lg:pr-8">
          <form onSubmit={handleSubmit}>
            <div className="mx-auto max-w-md sm:max-w-lg lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                5<sup>th</sup> Dare Doubles Tennis Tournament
              </h2>
              <p className="mt-4 text-lg text-gray-300 sm:mt-3">
                Venue: Lifetime, Oklahoma City
              </p>
              <p className="mt-4 text-lg text-gray-300 sm:mt-3">
                Date:{' '}
                <span className="font-bold">
                  May 13, 2023 (11:30 am - 6 pm)
                </span>
              </p>
              <div className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-white"
                  >
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      type="text"
                      id="first-name"
                      autoComplete="nope-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-white"
                  >
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                      id="last-name"
                      autoComplete="nope-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    />
                  </div>
                </div>

                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="flex w-full justify-between items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                      <div>
                        <span>Level: </span>
                        <span className="font-bold">{level}</span>
                      </div>
                      <svg className="-mr-1 ml-2 h-4 w-4" viewBox="0 0 500 500">
                        <path
                          d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {levels.map((level) => (
                          <Menu.Item key={level}>
                            {({ active }) => (
                              <button
                                type="button"
                                onClick={(e) => setLevel(level)}
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm w-full text-left'
                                )}
                              >
                                {level}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <div className="sm:col-span-2">
                  <div className="flex justify-between">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-white"
                    >
                      Email
                    </label>
                    <span
                      id="phone-description"
                      className="text-sm text-gray-100"
                    >
                      Optional
                    </span>
                  </div>
                  <div className="mt-1">
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      autoComplete="nope"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white"
                  >
                    Phone
                  </label>
                  <div className="mt-1">
                    <input
                      id="phone"
                      onChange={(e) => setPhone(e.target.value)}
                      type="text"
                      autoComplete="nope"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    />
                  </div>
                </div>
                {isInvalidInput && (
                  <div className="sm:col-span-2">
                    <span
                      id="phone-description"
                      className="text-sm text-red-500 font-bold"
                    >
                      First Name, Last Name, Level & Phone is required
                    </span>
                  </div>
                )}

                <div className="text-right sm:col-span-2">
                  <button
                    disabled={isInvalidInput}
                    onClick={handleSubmit}
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-bold text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-900"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="">
        <img className="w-full" src={TennisImage} alt="" />
      </div>
    </div>
  );
}

export default App;
