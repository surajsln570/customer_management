'use client'
import { Customer, CustomerType } from '@prisma/client';
import React, { useCallback, useEffect, useState } from 'react'
import PageHeader from '../common/Header';
import HeaderButton from '../common/HeaderButton';
import Link from 'next/link';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import Container from '../common/Container';
import CustomTable from '../common/CustomTable';
import { useRouter } from 'next/navigation';

type CustomerFormState = {
    name: string;
    email: string;
    phone: string;
    address: string;
    type: CustomerType;
}



export default function CustomersClients({ customer, type }: { customer: any[], type: CustomerType }) {
    const emptyForm = {
        name: "",
        email: "",
        phone: "",
        address: "",
        type: type as CustomerType
    }
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [formError, setFormError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [customers, setCustomers] = useState(customer);
    const router = useRouter();


    const fetchCustomers = useCallback(async (q?: string) => {
        setLoading(true);
        setError(null);
        try {
            const url = `/api/customers?search=${encodeURIComponent(search)}&type=${type}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to load customers");
            setCustomers(await res.json());
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);


    // useEffect(() => {
    //     const t = setTimeout(() => fetchCustomers(search), 300);
    //     return () => clearTimeout(t);
    // }, [search]);

    function openCreateModal() {
        setEditingId(null);
        setForm(emptyForm);
        setFormError(null);
        setModalOpen(true);
    }

    function openEditModal(c: any) {
        setEditingId(c.id);
        setForm({
            name: c.name,
            phone: c.phone ?? "",
            email: c.email ?? "",
            address: c.address ?? "",
            type: c.type ?? "JANSEVA"
        });
        setFormError(null);
        setModalOpen(true);
    }

    async function handleSave() {
        if (!form.name.trim()) {
            setFormError("Name is required");
            return;
        }
        setSaving(true);
        setFormError(null);

        const url = editingId ? `/api/customers/${editingId}` : "/api/customers";
        const method = editingId ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to save customer");

            setModalOpen(false);
            fetchCustomers(search);
        } catch (err: any) {
            setFormError(err.message);
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(c: Customer) {
        if (!confirm(`Delete customer "${c.name}"? This cannot be undone.`)) return;

        try {
            const res = await fetch(`/api/customers/${c.id}`, { method: "DELETE" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to delete customer");
            fetchCustomers(search);
        } catch (err: any) {
            alert(err.message);
        }
    }

    const columns = [

        { header: "Name", accessorKey: "name" },
        { header: 'Mobile', accessorKey: 'phone' },
        { header: "Email", accessorKey: "email" },
        {
            header: "Actions", id: 'actions', cell: ({ row }: { row: any }) => (
                <div>
                    <Button variant={'outline'} onClick={() => openEditModal(row.original)}>Edit</Button>
                    <Button variant={'destructive'} onClick={() => handleDelete(row.original)}>Delete</Button>
                    <Button variant={'outline'} onClick={() => router.push(`/customers/${row.original.id}`)}>View</Button>
                </div>
            ),
        }

    ]
    return (
        <div className="">
            <PageHeader
                header={`${type}`}
                subheader="Manage customer records used across billing."
            >
                <HeaderButton text="Add Customer" onClick={openCreateModal} />
            </PageHeader>


            <Container>
                <div className="mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={async (e) => { await setSearch(e.target.value), fetchCustomers() }}
                        placeholder="Search by name or phone..."
                        className="w-full max-w-sm border border-neutral-200 rounded-md px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                    />
                </div>

                {loading && <p className="text-neutral-500 text-sm">Loading customers...</p>}
                {error && (
                    <p className="text-danger-700 bg-danger-50 border border-danger-200 rounded-md px-3 py-2 text-sm mb-4">
                        {error}
                    </p>
                )}

                {!loading && !error && (
                    <CustomTable data={customers} columns={columns} />
                )}
            </Container>

            {modalOpen && (
                <div className="fixed inset-0 bg-overlay-black flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 border border-neutral-200">
                        <h2 className="text-lg font-semibold mb-4 text-neutral-900">
                            {editingId ? "Edit Customer" : "Add Customer"}
                        </h2>

                        {formError && (
                            <p className="text-danger-700 bg-danger-50 border border-danger-200 rounded-md px-3 py-2 text-sm mb-3">
                                {formError}
                            </p>
                        )}

                        <div className="space-y-3">
                            <Select value={form.type} onValueChange={(value) => setForm({ ...form, type: value as CustomerType })} >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {["JANSEVA", "VIDEOEDITING"].map((item) => (
                                            <SelectItem key={item} value={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <div>
                                <label className="block text-xs font-medium text-neutral-600 mb-1">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full border border-neutral-200 rounded-md px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-neutral-600 mb-1">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    className="w-full border border-neutral-200 rounded-md px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-neutral-600 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full border border-neutral-200 rounded-md px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-neutral-600 mb-1">
                                    Address
                                </label>
                                <textarea
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    className="w-full border border-neutral-200 rounded-md px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    rows={2}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 text-sm rounded-md border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-4 py-2 text-sm rounded-md bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 transition-colors"
                            >
                                {saving ? "Saving..." : editingId ? "Save Changes" : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )
            }
        </div >

    )
}
