import type React from "react";
import { Badge } from "./ui/badge";
import { GradientButton } from "./ui/gradient-button";
import { AnimatedEmoji } from "./ui/animated-emoji";

export interface KoinPackage {
  amount: number;
  price: number;
  emoji: string;
  color: string;
  badge: string;
  popular: boolean;
}

interface KoinPackageCardProps {
  package: KoinPackage;
  isPurchasing: boolean;
  onPurchase: (amount: number) => void;
}

/**
 * Composant carte d'affichage d'un package de Koins
 * Principe SRP: Responsabilité unique d'affichage d'un package
 */
export function KoinPackageCard({
  package: pkg,
  isPurchasing,
  onPurchase,
}: KoinPackageCardProps): React.ReactElement {
  return (
    <div
      className={`
        rounded-lg
        bg-white
        p-6 shadow-sm
        border-2
        transition-all duration-200 hover:shadow-md
        ${pkg.popular ? "border-moccaccino-500" : "border-gray-200"}
      `}
    >
      {/* Badge */}
      <Badge
        text={pkg.badge}
        gradient={pkg.popular ? "from-yellow-400 to-orange-500" : pkg.color}
        isPopular={pkg.popular}
      />

      {/* Contenu */}
      <div className="text-center">
        {/* Emoji du pack */}
        <div className="text-4xl mb-4">{pkg.emoji}</div>

        {/* Montant de Koins */}
        <div className="mb-4">
          <div className="text-3xl font-bold text-gray-900">
            {pkg.amount.toLocaleString("fr-FR")}
          </div>
          <p className="text-sm font-medium text-gray-600 mt-1">Koins</p>
        </div>

        {/* Prix */}
        <div className="mb-6">
          <div className="text-2xl font-bold text-lochinvar-700 mb-1">
            {pkg.price}€
          </div>
          <p className="text-xs text-gray-500">
            {(pkg.price / pkg.amount).toFixed(2)}€ par Koin
          </p>
        </div>

        {/* Bouton d'achat */}
        <button
          onClick={() => {
            onPurchase(pkg.amount);
          }}
          disabled={isPurchasing}
          className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:cursor-pointer ${
            pkg.popular
              ? "bg-moccaccino-500 text-white hover:bg-moccaccino-600"
              : "bg-lochinvar-500 text-white hover:bg-lochinvar-600"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isPurchasing ? "⏳ Chargement..." : "Acheter"}
        </button>
      </div>
    </div>
  );
}
