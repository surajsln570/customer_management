import { prisma } from '@/lib/prisma'
import { Users, FolderKanban, IndianRupee, AlertCircle, Wallet } from 'lucide-react'
import { transactionColumns } from './columns'
import { expenseColumns } from './expense-columns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import CustomTable from '@/components/common/CustomTable'

export default async function DashboardPage() {
  const [
    totalCustomers,
    ongoingProjects,
    completedProjects,
    jansevaCount,
    videoEditingCount,
    projectAmountAgg,
    incomeAgg,
    paymentAgg,
    expenseAgg,
    recentTransactions,
    recentExpenses,
  ] = await Promise.all([
    prisma.customer.count(),
    prisma.project.count({ where: { status: 'ONGOING' } }),
    prisma.project.count({ where: { status: 'COMPLETED' } }),
    prisma.customer.count({ where: { type: 'JANSEVA' } }),
    prisma.customer.count({ where: { type: 'VIDEOEDITING' } }),
    prisma.project.aggregate({ _sum: { projectAmount: true } }),
    prisma.transaction.aggregate({ _sum: { amount: true }, where: { type: 'INCOME', status: 'PAID' } }),
    prisma.transaction.aggregate({ _sum: { amount: true }, where: { type: 'PAYMENT', status: 'PAID' } }),
    prisma.expense.aggregate({ _sum: { amount: true } }),
    prisma.transaction.findMany({ take: 10, orderBy: { date: 'desc' }, include: { customer: true, project: true } }),
    prisma.expense.findMany({ take: 10, orderBy: { date: 'desc' } }),
  ])

  const totalProjects = ongoingProjects + completedProjects
  const totalCustomerType = jansevaCount + videoEditingCount

  const totalProjectAmount = projectAmountAgg._sum.projectAmount ?? 0
  const totalIncome = incomeAgg._sum.amount ?? 0
  const totalPayment = paymentAgg._sum.amount ?? 0
  const totalExpense = expenseAgg._sum.amount ?? 0

  const pendingAmount = totalProjectAmount - totalIncome
  const remainingBalance = totalIncome - totalPayment - totalExpense

  const stats = [
    { label: 'Total customers', value: totalCustomers, icon: Users },
    { label: 'Active projects', value: ongoingProjects, icon: FolderKanban },
    { label: 'Total income', value: `₹${totalProjectAmount.toLocaleString()}`, icon: IndianRupee },
    { label: 'Income received', value: `₹${totalIncome.toLocaleString()}`, icon: IndianRupee },
    { label: 'Pending amount', value: `₹${pendingAmount.toLocaleString()}`, icon: AlertCircle },
    { label: 'Total Expense', value: `₹${totalExpense.toLocaleString()}`, icon: Wallet },
    { label: 'Current balance', value: `₹${remainingBalance.toLocaleString()}`, icon: Wallet },
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of customers, projects and transactions</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-7 gap-3 mb-6">
        {stats.map((s) => (
          <Card size='sm' key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-normal text-muted-foreground">{s.label}</CardTitle>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Recent transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomTable columns={transactionColumns} data={recentTransactions} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Projects by status</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusBar label="Ongoing" value={ongoingProjects} total={totalProjects} />
            <StatusBar label="Completed" value={completedProjects} total={totalProjects} />

            <Separator className="my-4" />

            <p className="text-sm font-medium mb-3">Customer type</p>
            <StatusBar label="Janseva" value={jansevaCount} total={totalCustomerType} />
            <StatusBar label="Video editing" value={videoEditingCount} total={totalCustomerType} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Recent expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomTable columns={expenseColumns} data={recentExpenses} />
        </CardContent>
      </Card>
    </div>
  )
}

function StatusBar({ label, value, total }: { label: string; value: number; total: number }) {
  const pct = total ? Math.round((value / total) * 100) : 0
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span>{label}</span>
        <span className="text-muted-foreground">{value}</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full">
        <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}