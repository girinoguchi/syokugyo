<?php
/**
 * 求人カード（Next.js 版 JobCard.tsx を移植）。
 * 呼び出し例: get_template_part('template-parts/job-card', null, array('job' => $job));
 */
if (!defined('ABSPATH')) {
    exit;
}
$job = isset($args['job']) ? $args['job'] : (isset($job) ? $job : null);
if (!$job) {
    return;
}
$permalink = get_permalink((int) $job['id']);
$deadline = engine_format_deadline($job['deadline']);
?>
<a href="<?php echo esc_url($permalink); ?>" class="tc-card tc-card-hover p-5 flex flex-col h-full">
    <div class="flex flex-wrap items-center gap-2 mb-2">
        <?php if (!empty($job['job_type'])) : ?>
            <span class="rounded-full px-3 py-0.5 text-xs font-bold <?php echo esc_attr(engine_job_type_class($job['job_type'])); ?>"><?php echo esc_html($job['job_type']); ?></span>
        <?php endif; ?>
        <span class="tag-pill <?php echo esc_attr(engine_category_class($job['category'])); ?>"><?php echo esc_html($job['category']); ?></span>
    </div>

    <h3 class="font-black text-lg text-telecareer-ink leading-snug"><?php echo esc_html($job['title']); ?></h3>

    <dl class="mt-3 space-y-1 text-sm text-gray-600">
        <?php if (!empty($job['location'])) : ?>
            <div class="flex gap-2"><dt class="text-gray-400 shrink-0">勤務地</dt><dd class="font-semibold text-ink"><?php echo esc_html($job['location']); ?></dd></div>
        <?php endif; ?>
        <?php if (!empty($job['pay'])) : ?>
            <div class="flex gap-2"><dt class="text-gray-400 shrink-0">報酬</dt><dd class="font-semibold text-ink"><?php echo esc_html($job['pay']); ?></dd></div>
        <?php endif; ?>
        <?php if (!empty($job['work_period'])) : ?>
            <div class="flex gap-2"><dt class="text-gray-400 shrink-0">期間</dt><dd class="font-semibold text-ink"><?php echo esc_html($job['work_period']); ?></dd></div>
        <?php endif; ?>
        <?php if ($deadline) : ?>
            <div class="flex gap-2"><dt class="text-gray-400 shrink-0">締切</dt><dd class="font-semibold text-ink"><?php echo esc_html($deadline); ?></dd></div>
        <?php endif; ?>
    </dl>

    <?php if (!empty($job['tags'])) : ?>
        <div class="mt-3 flex flex-wrap gap-1.5">
            <?php foreach (array_slice($job['tags'], 0, 4) as $t) : ?>
                <span class="tag-pill tag-plain text-xs">#<?php echo esc_html($t); ?></span>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>

    <span class="mt-auto pt-4 text-sm font-bold link-accent">詳細を見る →</span>
</a>
