"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

import { states } from "@/utils/state";

export default function Home() {
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");

  const [clima, setClima] = useState("");
  const [temp, setTemp] = useState("");



  interface CityInformation {
    cep: string;
    cidade: string;
    uf: string;
  }

  async function handleSubmit() {
    const response = {
      cep,
    };

    const cepSearch = `https://viacep.com.br/ws/${response.cep}/json/`;

    const responseCity = await fetch(cepSearch);
    const responseCityJson = await responseCity.json();

    const state = states[responseCityJson.uf as never];

    setUf(state);
    setCidade(responseCityJson.localidade);

    const apiWeaterURl = `http://api.openweathermap.org/geo/1.0/direct?q=${cidade},${state}&limit=1&appid=${process.env.NEXT_PUBLIC_API_WEATHER_KEY}&lang=pt_br`;

    const responseWeather = await fetch(apiWeaterURl);
    const responseWeatherJson = await responseWeather.json();

    const lat = responseWeatherJson[0].lat;
    const lon = responseWeatherJson[0].lon;

    const weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_API_WEATHER_KEY}&lang=pt_br`;

    const responseWeatherlocal = await fetch(weather);

    const responseWeatherlocalJson = await responseWeatherlocal.json()

    const temp = String(parseInt(responseWeatherlocalJson.main.temp)) + "°C";
    const descriptiontemp = responseWeatherlocalJson.weather[0].description;

    setTemp(temp);
    setClima(descriptiontemp);

  }

  return (
    <div className="h-screen w-screen flex  flex-col items-center bg-slate-700 ">
      <div className="flex justify-center items-center flex-col space-y-4 bg-slate-400/70 rounded-xl p-3 mt-20">
        <div className="flex  gap-3">
          <div className="flex flex-col text-slate-800 ">
            <label>Cep:</label>
            <Input
              placeholder="Digite o Seu cep aqui !"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
          </div>

          <div className="flex flex-col text-slate-800 ">
            <label>cidade:</label>
            <Input placeholder=" Sua cidade aqui !" value={cidade} readOnly/>
          </div>

          <div className="flex flex-col text-slate-800 ">
            <label>Estado:</label>
            <Input placeholder=" Seu Estado aqui !" value={uf} readOnly/>
          </div>
        </div>

        <Button type="submit" onClick={handleSubmit}>
          {" "}
          Buscar !
        </Button>
      </div>


      <div className="flex justify-center items-center flex-col space-y-4 rounded-xl p-3 mb-20 mt-10">

        { (cidade && clima && temp) && 

        <Card className="p-10 flex flex-col justify-center items-center bg-slate-400/70 border-none gap-3">

          <CardTitle>
            {cidade}
          </CardTitle>

          <CardContent>{clima}</CardContent>

          <CardFooter>{temp}</CardFooter>

        </Card>

        }

      </div>

    </div>
  );
}
