import Container from '@/components/common/Container'
import PageHeader from '@/components/common/Header'
import Section from '@/components/common/Section'
import React from 'react'
import IncomeRecordFilters from './comp/IncomeRecordFilters'

export default async function IncomeRecordPage() {

    return (
        <div>
            <PageHeader header='Income Records' subheader='Sarvesh Chauhan' >

            </PageHeader>
            <Container>
                <Section>
                    <IncomeRecordFilters />
                </Section>
            </Container>

        </div>
    )
}
