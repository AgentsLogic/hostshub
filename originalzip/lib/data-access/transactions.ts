import { supabase } from "../supabase"
import type { Transaction } from "../database-schema"

export async function getTransactions(bookingId: string): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("booking_id", bookingId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching transactions:", error)
    throw error
  }

  return data as Transaction[]
}

export async function createTransaction(transaction: Omit<Transaction, "id" | "created_at">): Promise<Transaction> {
  const { data, error } = await supabase.from("transactions").insert(transaction).select().single()

  if (error) {
    console.error("Error creating transaction:", error)
    throw error
  }

  return data as Transaction
}

export async function updateTransactionStatus(
  id: string,
  status: "pending" | "completed" | "failed",
): Promise<Transaction> {
  const { data, error } = await supabase.from("transactions").update({ status }).eq("id", id).select().single()

  if (error) {
    console.error("Error updating transaction status:", error)
    throw error
  }

  return data as Transaction
}

export async function getTransactionTotals(
  bookingId: string,
): Promise<{ payments: number; refunds: number; payouts: number }> {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("booking_id", bookingId)
    .eq("status", "completed")

  if (error) {
    console.error("Error fetching transaction totals:", error)
    throw error
  }

  const transactions = data as Transaction[]

  return {
    payments: transactions.filter((t) => t.type === "payment").reduce((sum, t) => sum + t.amount, 0),
    refunds: transactions.filter((t) => t.type === "refund").reduce((sum, t) => sum + t.amount, 0),
    payouts: transactions.filter((t) => t.type === "payout").reduce((sum, t) => sum + t.amount, 0),
  }
}

