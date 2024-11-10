<script lang="ts">
	const questions = [
		{
			images: [
				"/1.png",
				"/2.png",
				"/3.png",
				"/4.png",
				"/5.png",
				"/6.png",
				"/7.png",
				"/8.png",
				"/9.png",
				"/10.png",
				"/11.png",
				"/12.png",
				"/13.png",
				"/14.png",
				"/15.png",
				"/16.png",
			],
			correctIndices: [14, 15, 3],
		},
	];

	let selectedIndices: number[] = [];
	let currentQuestion = questions[0];
	let message = "";
	let isSuccess = false;
	let showCongratulations = false;

	function handleImageSelect(index: number) {
		const isSelected = selectedIndices.includes(index);
		if (isSelected) {
			selectedIndices = selectedIndices.filter((i) => i !== index);
		} else {
			selectedIndices = [...selectedIndices, index];
		}
	}

	function handleSkip() {
		selectedIndices = [];
	}

	function handleSubmit() {
		if (selectedIndices.length === 0) {
			message = "Please select at least one image";
			isSuccess = false;
			return;
		}

		const allCorrectSelected = currentQuestion.correctIndices.every((i) => selectedIndices.includes(i));
		const noIncorrectSelected = selectedIndices.every((i) => currentQuestion.correctIndices.includes(i));

		if (allCorrectSelected && noIncorrectSelected) {
			showCongratulations = true;
			isSuccess = true;
		} else {
			message = "Incorrect. Try again";
			isSuccess = false;
			selectedIndices = [];
			setTimeout(() => {
				message = "";
			}, 2000);
		}
	}
</script>

{#if showCongratulations}
	<div class="h-screen w-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-2 overflow-hidden">
		<div class="h-full flex flex-col items-center justify-center text-center gap-4">
			<h1 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
				Congratulations!
			</h1>
			<p class="text-purple-200/80 text-lg">You've successfully completed the verification</p>
		</div>
	</div>
{:else}
	<div class="h-screen w-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-2 overflow-hidden">
		<div class="h-full flex items-center justify-center">
			<div class="max-w-2xl w-full flex flex-col gap-1.5">
				<!-- Message Toast -->
				{#if message}
					<div class="fixed top-2 right-2 z-50 animate-fade-in">
						<div
							class="px-2 py-1 rounded-md shadow-xl backdrop-blur-md {isSuccess
								? 'bg-emerald-500/90'
								: 'bg-rose-500/90'}">
							<p class="text-white text-xs font-medium">{message}</p>
						</div>
					</div>
				{/if}

				<!-- Header -->
				<div class="text-center space-y-0.5">
					<h1 class="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
						Motorcycle Quiz
					</h1>
					<p class="text-purple-200/80 text-xs">Select all motorcycles in motion</p>
				</div>

				<!-- Image Grid -->
				<div class="grid grid-cols-2 md:grid-cols-4 gap-1.5 p-1">
					{#each currentQuestion.images as image, i}
						<button
							on:click={() => handleImageSelect(i)}
							class="group relative aspect-square rounded-md overflow-hidden transform transition-all duration-300
								{selectedIndices.includes(i) ? 'scale-[1.02] ring-2 ring-purple-400 shadow-lg' : 'hover:scale-[1.01] hover:shadow-sm hover:ring-1 hover:ring-purple-400/50'}">
							<img
								src={image}
								alt="Quiz option {i + 1}"
								class="w-full h-full object-cover
									{selectedIndices.includes(i) ? 'brightness-110' : 'group-hover:brightness-105'}" />
							<!-- Overlay for selected state -->
							<div
								class="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent transition-opacity
									{selectedIndices.includes(i) ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}" />
							<!-- Checkmark for selected state -->
							{#if selectedIndices.includes(i)}
								<div class="absolute top-1 right-1 bg-purple-500 rounded-full p-0.5 shadow-lg">
									<svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="3"
											d="M5 13l4 4L19 7" />
									</svg>
								</div>
							{/if}
							<!-- Number indicator -->
							<div
								class="absolute bottom-1 left-1 text-white text-xs font-bold
									{selectedIndices.includes(i) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} 
									transition-opacity">
								{i + 1}
							</div>
						</button>
					{/each}
				</div>

				<!-- Controls -->
				<div class="flex items-center justify-center gap-1.5">
					<button on:click={handleSkip} class="px-3 py-1 rounded text-xs text-purple-200 hover:text-white transition-colors">
						Skip
					</button>
					<button
						on:click={handleSubmit}
						class="px-3 py-1 rounded text-xs bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600
							text-white font-medium shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5">
						Check Answer
					</button>
				</div>

				<!-- Progress Bar -->
				<div class="max-w-xs mx-auto w-full">
					<div class="bg-white/10 rounded-full h-1 overflow-hidden">
						<div class="bg-gradient-to-r from-purple-500 to-pink-500 h-full w-1/5 rounded-full" />
					</div>
					<div class="flex justify-between mt-0.5 text-purple-200/60 text-[10px]">
						<span>Question 1 of 5</span>
						<span>20% Complete</span>
					</div>
				</div>

				<!-- Selected Counter -->
				<div class="text-purple-200/80 text-xs text-center mt-1">
					Selected: {selectedIndices.length} / {currentQuestion.correctIndices.length} required
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(-1rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fade-in {
		animation: fade-in 0.3s ease-out;
	}
</style>
