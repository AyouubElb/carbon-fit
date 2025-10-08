"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { SUPABASE_IMAGE_URL } from "@/lib/supabaseClient";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, total, updateQuantity, removeItem } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg gap-0">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-[#E8E8E8] font-heading text-xl font-medium tracking-wide uppercase">
            <ShoppingBag className="h-5 w-5" />
            Panier ({items.length})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <ShoppingBag className="h-16 w-16 text-[#E8E8E8]" />
              <h3 className="text-[#E8E8E8] text-lg font-semibold tracking-wide ">
                Votre panier est vide
              </h3>
              <p className="text-[#E8E8E8BF] text-center font-medium">
                Ajoutez des articles pour commencer
              </p>
              <Button
                asChild
                onClick={onClose}
                className="bg-[#ecc174] h-10 font-medium rounded-none uppercase cursor-pointer hover:bg-[#ecc174] hover:opacity-90 transition-opacity"
              >
                <Link href="/collections">Continuer vos achats</Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-6">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="bg-[#1f1f21] flex gap-4 px-6 py-4"
                  >
                    <Image
                      src={
                        SUPABASE_IMAGE_URL + item.image || "/placeholder.svg"
                      }
                      alt={item.name}
                      width={100}
                      height={80}
                      className="aspect-square object-cover"
                    />

                    <div className="flex-1 space-y-2">
                      <div>
                        <h4 className="font-heading uppercase tracking-wide font-medium text-[#E8E8E8]">
                          {item.name}
                        </h4>
                        <p className="text-sm text-[#ecc174] font-medium">
                          {item.brand}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        {item.size && (
                          <Badge
                            variant="outline"
                            className="text-[#E8E8E8] text-xs border-0"
                          >
                            Size: {item.size}
                          </Badge>
                        )}
                        {item.color && (
                          <Badge
                            variant="outline"
                            className="text-[#E8E8E8] text-xs border-0"
                          >
                            {item.color}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent text-[#E8E8E8] cursor-pointer"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium text-[#E8E8E8]">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent text-[#E8E8E8] cursor-pointer"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#E8E8E8]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                            onClick={() => removeItem(item.id, item.size)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="border-t p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#E8E8E8] text-lg font-semibold">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-[#E8E8E8]">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-3">
                  <Button
                    asChild
                    className="w-full text-base font-medium border border-1 border-[#ecc174] text-[#ecc174] bg-transparent rounded-none"
                    onClick={onClose}
                  >
                    <Link href="/checkout">Finaliser l’achat</Link>
                  </Button>
                  <Button
                    className="w-full text-base font-medium bg-transparent text-[#ecc174] hover:bg-transparent cursor-pointer"
                    onClick={onClose}
                    asChild
                  >
                    <Link href="/collections">
                      <span className="relative after:absolute after:bottom-[-3px] after:left-0 after:w-full after:h-[1px] after:bg-[#ecc174]">
                        Continuer vos achats
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
