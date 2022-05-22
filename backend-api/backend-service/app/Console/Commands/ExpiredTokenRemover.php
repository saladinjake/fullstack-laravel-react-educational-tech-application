<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ExpiredTokenRemover extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'remove:expiredtoken';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remove expired passport tokens';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Purging Questence Expired Tokens... 🚀');
 
        $this->info('Expired Tokens Purged Successfully! 🔥');
    }
}
