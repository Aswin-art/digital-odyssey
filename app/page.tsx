"use client";
import Modal from "@/components/Modal";
import MusicBackground from "@/components/MusicBackground";
import useGameState from "@/hooks/store";
import localFont from "next/font/local";
import AnimatedCursor from "react-animated-cursor";
import { Howl } from "howler";
import Navbar from "@/components/Navbar";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gamePlayerSchema } from "@/schemas/index.schema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

const myFont = localFont({
  src: "./dragon-hunter.otf",
  display: "swap",
});

export default function Home() {
  const gameState = useGameState((state) => state);
  const session = useSession();
  const router = useRouter();

  const playForm = useForm<z.infer<typeof gamePlayerSchema>>({
    resolver: zodResolver(gamePlayerSchema),
    defaultValues: {
      gameCode: "",
      playerName: "",
      playerNpm: "",
    },
  });

  const handleHover = () => {
    const buttonPlayElement = document.getElementById("buttonPlay");
    if (buttonPlayElement) {
      buttonPlayElement.style.filter = "brightness(0.8)";
    }
  };

  const handleHoverExit = () => {
    const buttonPlayElement = document.getElementById("buttonPlay");
    if (buttonPlayElement) {
      buttonPlayElement.style.filter = "brightness(1)";
    }
  };

  const handleHoverCreate = () => {
    const buttonCreateElement = document.getElementById("buttonCreate");
    if (buttonCreateElement) {
      buttonCreateElement.style.filter = "brightness(0.8)";
    }
  };

  const handleHoverCreateExit = () => {
    const buttonCreateElement = document.getElementById("buttonCreate");
    if (buttonCreateElement) {
      buttonCreateElement.style.filter = "brightness(1)";
    }
  };

  const handleButtonClick = () => {
    if (session.data?.user) {
      const newSound = new Howl({
        src: ["/musics/click_button.wav"],
        autoplay: true,
      });
      newSound.play();
      router.push("/dashboard");
    } else {
      signIn("google", {
        callbackUrl: "/dashboard",
      });
      gameState.changeIsLogin();
    }
  };

  const updateModalIntroState = useGameState(
    (state) => state.changeModalHeadphone
  );

  const handlePlayFormSubmit = async (
    values: z.infer<typeof gamePlayerSchema>
  ) => {
    const loadingToastId = toast.loading("Loading...");
    try {
      const res = await fetch("http://localhost:3000/api/game_players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast.success("Berhasil masuk ke game!", { id: loadingToastId });
        localStorage.setItem("gameCode", values.gameCode);
        localStorage.setItem("playerName", values.playerName);
        localStorage.setItem("playerNpm", values.playerNpm);
        router.push("/games");
      } else {
        toast.error(`Kode game salah!`, { id: loadingToastId });
      }
    } catch (error) {
      toast.error(`Gagal masuk ke game!`, { id: loadingToastId });
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="hidden lg:block">
        {!gameState.modalHeadphone ? (
          <Modal
            title="Tips Sebelum Bermain"
            desc="Gunakan headphone untuk kenyamanan bermain"
            btnText="Mengerti!"
            onClickFunc={updateModalIntroState}
          />
        ) : (
          <>
            <Navbar />
            <main
              className="flex flex-col items-center min-h-screen justify-end gap-5 p-24"
              style={{
                backgroundImage: `url('/images/bg-hero.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h1
                className={`text-4xl lg:none text-white font-bold ${myFont.className}`}
              >
                digital odyssey
              </h1>
              <h1 className="text-6xl text-white font-bold">
                The Canonical Chronicles
              </h1>
              <div className="flex gap-3">
                <h1
                  className={`text-2xl text-black font-bold px-14 py-3 hover:cursor-pointer ${myFont.className}`}
                  id="buttonCreate"
                  style={{
                    backgroundImage: `url('/images/btn-background.webp')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transition: "filter 0.3s",
                  }}
                  onMouseEnter={handleHoverCreate}
                  onMouseLeave={handleHoverCreateExit}
                  onClick={handleButtonClick}
                >
                  create game
                </h1>
                <Dialog>
                  <DialogTrigger>
                    <h1
                      className={`text-2xl text-black font-bold px-14 py-3 hover:cursor-pointer ${myFont.className}`}
                      id="buttonPlay"
                      style={{
                        backgroundImage: `url('/images/btn-background.webp')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        transition: "filter 0.3s",
                      }}
                      onMouseEnter={handleHover}
                      onMouseLeave={handleHoverExit}
                    >
                      play game
                    </h1>
                  </DialogTrigger>
                  <DialogContent className="bg-black text-white">
                    <DialogHeader>
                      <DialogTitle>
                        Masukkan kode game agar dapat bermain!
                      </DialogTitle>
                      <DialogDescription>
                        kode game diperlukan untuk ikut bermain di dalam game,
                        minta room master jika kamu belum mendapatkan kode.
                      </DialogDescription>
                    </DialogHeader>

                    <Form {...playForm}>
                      <form
                        onSubmit={playForm.handleSubmit(handlePlayFormSubmit)}
                      >
                        <div className="grid grid-cols-2 gap-5 mb-5">
                          <FormField
                            control={playForm.control}
                            name="gameCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Kode Game</FormLabel>
                                <FormControl>
                                  <Input
                                    className="bg-black"
                                    autoComplete="false"
                                    placeholder="kode..."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={playForm.control}
                            name="playerName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nama Player</FormLabel>
                                <FormControl>
                                  <Input
                                    className="bg-black"
                                    autoComplete="false"
                                    placeholder="nama..."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={playForm.control}
                            name="playerNpm"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>NPM Player</FormLabel>
                                <FormControl>
                                  <Input
                                    className="bg-black"
                                    autoComplete="false"
                                    placeholder="npm..."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <Button
                          variant={"secondary"}
                          type="submit"
                          disabled={false}
                        >
                          Lanjutkan
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </main>
            <MusicBackground />

            <AnimatedCursor
              innerSize={10}
              outerSize={45}
              innerScale={1}
              outerScale={2}
              outerAlpha={0}
              innerStyle={{
                backgroundColor: "white",
              }}
              outerStyle={{
                border: "3px solid white",
              }}
            />
          </>
        )}
      </div>
      <div className="block lg:hidden">
        <Modal
          title="Resolusi Tidak Sesuai"
          desc="Buka dan mainkan di resolusi minimal 1024px"
          btnText="Mengerti!"
          onClickFunc={() => null}
        />
      </div>
    </>
  );
}
