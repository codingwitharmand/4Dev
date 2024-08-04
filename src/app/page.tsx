import Image from "next/image";

export default function Home() {

    return (
        <main className="flex flex-row justify-between p-24">
            <div className="flex flex-col w-1/2 p-10">
                <h1 className="text-4xl font-bold">A social network <i className="text-primary">for developers</i> 🚀
                </h1>
                <p className="text-lg mt-4">
                    Join community and start networking
                </p>
                <Image src="/code-thinking.svg" alt="" width={600} height={600} className="pt-16"></Image>
            </div>
            <div className="flex flex-col items-center justify-center w-1/2">
                <form className="flex flex-col w-full mt-4 shadow-md rounded-md p-8">
                    <h1 className="text-5xl font-bold mb-4">4Devs</h1>
                    <div className="relative my-4">
                        <input type="email" id="email"
                               className="border-2 block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                               placeholder=" "/>
                        <label htmlFor="email"
                               className="absolute text-m text-white dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email</label>
                    </div>
                    <div className="relative mt-4">
                        <input type="password" id="password"
                               className="border-2 block px-2 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                               placeholder=" "/>
                        <label htmlFor="password"
                               className="absolute text-m text-white dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
                    </div>
                    <div className="flex items-center mt-4 mb-4">
                        <input id="remember-me" type="checkbox" value=""
                               className="w-4 h-4 accent-primary rounded focus:ring-primary"/>
                        <label htmlFor="remember-me" className="ms-2 text-sm font-medium text-gray-500">Remember
                            Me</label>
                    </div>
                    <a href="/forgotten-password" className="text-sm font-medium text-primary hover:text-secondary">Forgot
                        Password?</a>
                    <button className="bg-primary hover:bg-secondary text-white font-bold py-3 rounded-md mt-4">Sign
                        In
                    </button>
                    <div className="flex flex-col items-center mt-4">
                        <div className="flex flex-row items-center justify-center w-full">
                            <hr className="border-1 w-1/2"/>
                            <span className="mx-3">or</span>
                            <hr className="border-1 w-1/2"/>
                        </div>
                        <button
                            className="flex flex-row justify-center text-secondary font-bold mb-4 py-2 rounded-md w-full mt-4 border-2 border-gray-300 hover:bg-color-tertiary">
                            <Image src="/github-image.png" width={20} height={20} alt="Google Logo" className="mr-2"/>
                            Continue with Github
                        </button>
                    </div>
                </form>
                <div className="flex flex-row items-center justify-center w-full">
                    <p className="mr-1">New to 4Dev ?</p>
                    <a href="/register" className="text-primary font-bold hover:text-secondary">Join now</a>
                </div>
            </div>
        </main>
    );
}
