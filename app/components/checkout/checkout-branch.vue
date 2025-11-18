<template>
  <div class="min-h-screen bg-gray-50">
    <CheckoutHeader />

    <div class="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-6">
        <!-- Type Of Order -->
        <BaseCard title="Type Of Order">
          <BaseRadio name="type" label="Delivery" />
          <BaseRadio name="type" label="Takeaway" class="ml-4" />
        </BaseCard>

        <!-- Branch -->
        <BaseCard title="Branch">
          <BaseSelect label="Select Branch" />
        </BaseCard>

        <!-- Schedule Order -->
        <BaseCard title="Schedule Order">
          <div class="flex gap-6">
            <BaseRadio name="schedule" label="Schedule Order" />
            <BaseRadio name="schedule" label="Order Now" />
          </div>
        </BaseCard>

        <!-- Payment -->
        <BaseCard title="Payment Methods">
          <BaseRadio name="payment" label="Card" />
          <BaseRadio name="payment" label="Cash" class="ml-6" />
        </BaseCard>

        <button class="btn-primary w-full">Confirm</button>
      </div>

      <CheckoutSummary />
    </div>

    <CheckoutFooter />
  </div>
</template>
