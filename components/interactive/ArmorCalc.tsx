"use client";

import { ArmorDefinition } from "@/vendor/suroi/common/src/definitions/armors";
import {
  GunDefinition,
  Guns,
} from "@/vendor/suroi/common/src/definitions/guns";
import { Helmets as Vest } from "@/vendor/suroi/common/src/definitions/helmets";
import { Vests } from "@/vendor/suroi/common/src/definitions/vests";

import { useState } from "react";

export default function ArmorCalc() {
  const [selectedGun, setSelectedGun] = useState<null | GunDefinition>(null);
  const [selectedHelmet, setSelectedHelmet] = useState<null | ArmorDefinition>(
    null
  );
  const [selectedVest, setSelectedVest] = useState<null | ArmorDefinition>(
    null
  );

  return (
    <div className="p-4 border border-[gray]">
      <div className="mt-2 flex items-center gap-2">
        <label htmlFor="gun">Gun</label>
        <select
          id="gun"
          className="bg-muted rounded flex-1"
          onChange={(e) => {
            if (e.target.value === "") setSelectedGun(null);
            else
              setSelectedGun(
                Guns.find((gun) => gun.idString === e.target.value) ?? null
              );
          }}
        >
          <option value="">Select One</option>
          {Guns.map((gun) => (
            <option value={gun.idString} key={gun.idString}>
              {gun.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <label htmlFor="helmet">Helmet</label>
        <select
          id="helmet"
          className="bg-muted rounded flex-1"
          onChange={(e) => {
            if (e.target.value === "") setSelectedHelmet(null);
            else
              setSelectedHelmet(
                Vest.find((helmet) => helmet.idString === e.target.value) ??
                  null
              );
          }}
        >
          <option value="">None</option>
          {Vest.map((helmet) => (
            <option value={helmet.idString} key={helmet.idString}>
              {helmet.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <label htmlFor="vest">Vest</label>
        <select
          id="vest"
          className="bg-muted rounded flex-1"
          onChange={(e) => {
            if (e.target.value === "") setSelectedVest(null);
            else
              setSelectedVest(
                Vests.find((vest) => vest.idString === e.target.value) ?? null
              );
          }}
        >
          <option value="">None</option>
          {Vests.map((vest) => (
            <option value={vest.idString} key={vest.idString}>
              {vest.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex justify-center items-center flex-col">
        {!selectedGun && (
          <span className="font-bold">Select a gun to begin.</span>
        )}
        {selectedGun && (
          <>
            <span>
              <span className="font-bold">
                <abbr title="Damage of a single bullet">Bullet Damage</abbr>:
              </span>{" "}
              {selectedGun.ballistics.damage}
              {selectedGun.bulletCount && selectedGun.bulletCount > 1 && (
                <span> (x{selectedGun.bulletCount} bullets)</span>
              )}
            </span>
            <span>
              <span className="font-bold">Damage Reduction:</span>{" "}
              {((selectedHelmet?.damageReduction ?? 0) +
                (selectedVest?.damageReduction ?? 0)) *
                100}
              %
            </span>
            <span>
              <span className="font-bold">Resulting Damage:</span>{" "}
              {(
                selectedGun.ballistics.damage *
                (1 -
                  ((selectedHelmet?.damageReduction ?? 0) +
                    (selectedVest?.damageReduction ?? 0)))
              ).toFixed(2)}{" "}
              (
              {(
                selectedGun.ballistics.damage *
                  (1 -
                    ((selectedHelmet?.damageReduction ?? 0) +
                      (selectedVest?.damageReduction ?? 0))) -
                selectedGun.ballistics.damage
              ).toFixed(2)}
              )
            </span>
            <span>
              <span className="font-bold">
                <abbr title="Bullets to kill a player wearing this armor combo at full health">
                  Bullets to Kill:
                </abbr>
              </span>{" "}
              {Math.ceil(
                100 /
                  (selectedGun.ballistics.damage *
                    (1 -
                      ((selectedHelmet?.damageReduction ?? 0) +
                        (selectedVest?.damageReduction ?? 0))))
              )}
              {selectedGun.bulletCount && selectedGun.bulletCount > 1 && (
                <span>
                  {" "}
                  (
                  {Math.ceil(
                    100 /
                      (selectedGun.ballistics.damage *
                        (1 -
                          ((selectedHelmet?.damageReduction ?? 0) +
                            (selectedVest?.damageReduction ?? 0)))) /
                      selectedGun.bulletCount
                  )}{" "}
                  shot(s) with {selectedGun.bulletCount} bullets)
                </span>
              )}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
