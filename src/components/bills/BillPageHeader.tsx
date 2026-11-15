'use client'
import React, { useState } from 'react'
import PageHeader from '../common/Header'
import HeaderButton from '../common/HeaderButton'
import Model from '../common/Model';
import AddTransactionForm from './AddTransactionForm';

export default function BillPageHeader() {
    const [showForm, setShowForm] = useState<boolean>(false);
    return (
        <div>
            <PageHeader header='Create/View Bills' subheader='manage your bills' >
                <HeaderButton onClick={() => setShowForm(true)} text='Create Bills' />
            </PageHeader>
            <Model open={showForm} onClose={() => setShowForm(false)} title='Create Bill' >
                <AddTransactionForm onClose={() => setShowForm(false)} />
            </Model>
        </div>
    )
}
