<template>
	<div class="flex flex-col min-h-screen">
		<NuxtLoadingIndicator/>

		<TheHeader/>

		<main class="flex-1 pb-8 bg-gray-600">
			<div class="container">
				<NuxtPage/>
			</div>
		</main>
	</div>

	<AppDialog/>
</template>
