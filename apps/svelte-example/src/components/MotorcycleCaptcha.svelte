<script lang="ts">
	const questions = [
		{
			image: "/1.png",
			correctIndices: [10, 11, 14, 1],
		},
	];

	let selectedIndices: number[] = [];
	let currentQuestion = questions[0];
	let message = "";
	let isSuccess = false;
	let showCongratulations = false;

	const positions = Array.from({ length: 16 }, (_, i) => i);

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
		<!-- Message Toast -->
		{#if message}
			<div class="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
				<div class="px-4 py-2 rounded-lg shadow-xl backdrop-blur-md {isSuccess ? 'bg-emerald-500/90' : 'bg-rose-500/90'}">
					<p class="text-white text-sm font-medium">{message}</p>
				</div>
			</div>
		{/if}

		<div class="h-full w-full flex items-center justify-center">
			<div class="max-w-[400px] w-full flex flex-col gap-4">
				<!-- Header -->
				<div class="text-center space-y-2">
					<h1 class="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
						Motorcycle Quiz
					</h1>
					<p class="text-purple-200/80 text-base">Where is the motorcycle?</p>
				</div>

				<!-- Image Grid -->
				<div class="relative mx-auto w-full aspect-square border-4 border-white rounded-lg overflow-hidden">
					<!-- Background Image -->
					<img src={currentQuestion.image} alt="Background" class="absolute inset-0 w-full h-full object-cover" />

					<!-- Grid Overlay -->
					<div class="relative h-full w-full grid grid-cols-4 gap-1">
						{#each positions as position, i}
							<button
								on:click={() => handleImageSelect(i)}
								class="group relative aspect-square transform transition-all duration-300
								{selectedIndices.includes(i)
									? 'ring-2 ring-purple-400 shadow-lg bg-purple-900/20'
									: 'hover:ring-1 hover:ring-purple-400/50 bg-purple-900/40 hover:bg-purple-900/30'}
								rounded-md overflow-hidden">
								<div
									class="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent transition-opacity
									{selectedIndices.includes(i) ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}" />

								{#if selectedIndices.includes(i)}
									<div class="absolute top-1 right-1 bg-purple-500 rounded-full p-1 shadow-lg">
										<svg
											class="w-3 h-3 text-white"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="3"
												d="M5 13l4 4L19 7" />
										</svg>
									</div>
								{/if}

								<div
									class="absolute bottom-1 left-1 text-white text-xs font-bold
									{selectedIndices.includes(i) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} 
									transition-opacity">
									{i + 1}
								</div>
							</button>
						{/each}
					</div>
				</div>

				<!-- Controls -->
				<div class="flex items-center justify-center gap-3">
					<button on:click={handleSkip} class="px-4 py-1.5 rounded-md text-sm text-purple-200 hover:text-white transition-colors">
						Skip
					</button>
					<button
						on:click={handleSubmit}
						class="px-4 py-1.5 rounded-md text-sm bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600
						text-white font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
						Check Answer
					</button>
				</div>

				<!-- Progress Bar -->
				<div class="max-w-md mx-auto w-full">
					<div class="bg-white/10 rounded-full h-1.5 overflow-hidden">
						<div class="bg-gradient-to-r from-purple-500 to-pink-500 h-full w-1/5 rounded-full" />
					</div>
					<div class="flex justify-between mt-1 text-purple-200/60 text-xs">
						<span>Question 1 of 5</span>
						<span>20% Complete</span>
					</div>
				</div>

				<!-- Selected Counter -->
				<div class="text-purple-200/80 text-2xl font-bold text-center">
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
			transform: translate(-50%, -1rem);
		}
		to {
			opacity: 1;
			transform: translate(-50%, 0);
		}
	}
	.animate-fade-in {
		animation: fade-in 0.3s ease-out;
	}
</style>
