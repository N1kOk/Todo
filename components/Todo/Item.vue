<template>
	<div class="p-4 pb-8 bg-gray-500 rounded">
		<div class="flex items-start space-x-4">
			<AppCheckbox/>
			<div class="flex flex-col flex-1 space-y-4">
				<div class="flex justify-between items-center">
					<h2 class="text-xl font-bold">Title</h2>
					<div class="flex items-center space-x-4">
						<div class="flex space-x-1 text-[10px]">
							<div class="text-gray-300">
								<div>Дата создания:</div>
								<div>Дата окончания:</div>
							</div>
							<div class="text-blue">
								<div>27.02.2023</div>
								<div>27.03.2023</div>
							</div>
						</div>
						<IconTrash class="hover:text-red-400"/>
						<IconEdit/>
					</div>
				</div>

				<p class="text-sm">Lorem ipsum dolor sit amet</p>
			</div>
		</div>
	</div>
</template>

<script>

</script>

<style scoped>

</style>