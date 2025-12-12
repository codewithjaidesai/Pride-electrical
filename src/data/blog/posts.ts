/**
 * Static Blog Posts Data
 * This data can be replaced with Sanity CMS fetch when configured
 */

import type { BlogPost, BlogCategory, FAQ } from '@/lib/sanity/types';

export const blogCategories: BlogCategory[] = [
  {
    id: 'guides',
    slug: 'guides',
    title: 'Guides & Tutorials',
    description: 'In-depth guides on cable accessories selection and installation',
  },
  {
    id: 'industry',
    slug: 'industry-news',
    title: 'Industry News',
    description: 'Latest updates from the electrical industry',
  },
  {
    id: 'products',
    slug: 'product-updates',
    title: 'Product Updates',
    description: 'New products and catalog updates from Dowell\'s',
  },
  {
    id: 'tips',
    slug: 'tips-tricks',
    title: 'Tips & Tricks',
    description: 'Quick tips for electrical professionals',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'cable-gland-selection-guide',
    slug: 'complete-guide-cable-gland-selection',
    title: 'Complete Guide to Cable Gland Selection',
    excerpt:
      'Learn how to select the right cable gland for your application. Covers IP ratings, materials, thread types, and hazardous area requirements.',
    content: `
      <h2>Introduction to Cable Glands</h2>
      <p>Cable glands are essential components in electrical installations, providing secure cable entry, strain relief, and environmental sealing. Choosing the right cable gland ensures proper protection and compliance with safety standards.</p>

      <h2>Key Selection Criteria</h2>

      <h3>1. Cable Outer Diameter</h3>
      <p>The most critical factor is matching the gland size to your cable's outer diameter. Cable glands are designed for specific OD ranges. Always check the manufacturer's specifications to ensure proper sealing.</p>

      <h3>2. Material Selection</h3>
      <ul>
        <li><strong>Brass:</strong> Most common choice, excellent corrosion resistance, suitable for indoor and outdoor use</li>
        <li><strong>Stainless Steel (SS316):</strong> For marine, chemical, and highly corrosive environments</li>
        <li><strong>Nylon/Polyamide:</strong> Lightweight, non-conductive, good for general indoor applications</li>
      </ul>

      <h3>3. IP Rating</h3>
      <p>IP (Ingress Protection) ratings indicate protection against dust and water:</p>
      <ul>
        <li><strong>IP66:</strong> Dust tight, protection against powerful water jets</li>
        <li><strong>IP68:</strong> Dust tight, suitable for continuous submersion</li>
      </ul>

      <h3>4. Thread Type</h3>
      <p>Common thread standards include:</p>
      <ul>
        <li><strong>Metric (M):</strong> M16, M20, M25, M32, M40, M50, M63</li>
        <li><strong>PG:</strong> PG7, PG9, PG11, PG13.5, PG16, PG21, PG29</li>
        <li><strong>NPT:</strong> American standard, commonly used in oil & gas</li>
      </ul>

      <h3>5. Hazardous Area Requirements</h3>
      <p>For explosive atmospheres, choose:</p>
      <ul>
        <li><strong>Weather Proof:</strong> Standard applications with IP68 protection</li>
        <li><strong>Flame Proof (Ex d):</strong> For Zone 1 & 2 hazardous areas</li>
        <li><strong>Increased Safety (Ex e):</strong> Enhanced protection against ignition</li>
      </ul>

      <h2>Installation Best Practices</h2>
      <ol>
        <li>Measure cable OD accurately before ordering</li>
        <li>Use proper sealing washers and locknuts</li>
        <li>Tighten to manufacturer's torque specifications</li>
        <li>Verify seal integrity after installation</li>
      </ol>

      <h2>Dowell's Cable Gland Range</h2>
      <p>Pride Electrical stocks the complete range of Dowell's cable glands including:</p>
      <ul>
        <li>Brass Double Compression glands (Weather Proof & Flame Proof)</li>
        <li>SS316 glands for marine applications</li>
        <li>Nylon cable glands for lightweight applications</li>
      </ul>

      <p>Contact our team for assistance in selecting the right cable glands for your project.</p>
    `,
    publishedAt: '2024-11-15',
    author: {
      name: 'Pride Electrical Team',
      bio: 'Technical experts at Pride Electrical',
    },
    categories: ['Guides & Tutorials'],
    tags: ['cable glands', 'IP rating', 'hazardous areas', 'installation guide'],
    readingTime: 8,
    seoTitle: 'Complete Guide to Cable Gland Selection | Pride Electrical',
    seoDescription:
      'Expert guide on selecting the right cable gland. Learn about IP ratings, materials, thread types, and hazardous area requirements. Dowell\'s authorized dealer.',
  },
  {
    id: 'copper-vs-aluminium-lugs',
    slug: 'copper-vs-aluminium-lugs-comparison',
    title: 'Copper vs Aluminium Lugs: When to Use What',
    excerpt:
      'A detailed comparison of copper and aluminium cable lugs, including when to use each type and the importance of bi-metallic connections.',
    content: `
      <h2>Understanding Cable Lug Materials</h2>
      <p>Choosing between copper and aluminium lugs depends on your cable material, application requirements, and environmental conditions. This guide helps you make the right choice.</p>

      <h2>Copper Cable Lugs</h2>

      <h3>Advantages</h3>
      <ul>
        <li><strong>Superior Conductivity:</strong> Copper has ~60% better conductivity than aluminium</li>
        <li><strong>Corrosion Resistance:</strong> Less prone to oxidation</li>
        <li><strong>Mechanical Strength:</strong> Can withstand repeated crimping and vibration</li>
        <li><strong>Smaller Size:</strong> Same current capacity in smaller cross-section</li>
      </ul>

      <h3>When to Use Copper Lugs</h3>
      <ul>
        <li>Copper conductor cables</li>
        <li>High-current applications</li>
        <li>Marine and corrosive environments</li>
        <li>Critical connections requiring reliability</li>
        <li>Smaller panel boards with space constraints</li>
      </ul>

      <h2>Aluminium Cable Lugs</h2>

      <h3>Advantages</h3>
      <ul>
        <li><strong>Cost Effective:</strong> Significantly cheaper than copper</li>
        <li><strong>Lightweight:</strong> About 1/3 the weight of copper</li>
        <li><strong>Abundant:</strong> More readily available</li>
        <li><strong>Good for Long Runs:</strong> Weight savings in overhead installations</li>
      </ul>

      <h3>When to Use Aluminium Lugs</h3>
      <ul>
        <li>Aluminium conductor cables</li>
        <li>Cost-sensitive projects</li>
        <li>Long cable runs where weight matters</li>
        <li>Indoor, dry environments</li>
      </ul>

      <h2>The Bi-Metallic Solution</h2>
      <p>When connecting aluminium cables to copper busbars (common in panel boards), you need bi-metallic lugs:</p>

      <h3>Why Bi-Metallic?</h3>
      <ul>
        <li>Prevents galvanic corrosion between dissimilar metals</li>
        <li>Aluminium barrel for cable, copper palm for busbar</li>
        <li>Friction-welded joint ensures reliable connection</li>
        <li>Essential for code compliance in many applications</li>
      </ul>

      <h2>Common Mistakes to Avoid</h2>
      <ol>
        <li><strong>Never connect aluminium directly to copper</strong> - Use bi-metallic lugs or proper joint compound</li>
        <li><strong>Don't use undersized lugs</strong> - Always match lug size to cable cross-section</li>
        <li><strong>Avoid over-crimping</strong> - Follow manufacturer's die recommendations</li>
        <li><strong>Don't ignore oxidation</strong> - Clean aluminium conductors before crimping</li>
      </ol>

      <h2>Dowell's Lug Range</h2>
      <p>Pride Electrical stocks comprehensive ranges:</p>
      <ul>
        <li><strong>Copper:</strong> CUS series (Medium Duty), CBS series (Heavy Duty), Sector lugs</li>
        <li><strong>Aluminium:</strong> ALS series tube terminals, Sector lugs</li>
        <li><strong>Bi-metallic:</strong> BMCS series with friction-welded joints</li>
      </ul>

      <p>Need help selecting the right lugs? Use our <a href="/quote-generator">Quote Generator</a> or contact our team.</p>
    `,
    publishedAt: '2024-11-10',
    author: {
      name: 'Pride Electrical Team',
      bio: 'Technical experts at Pride Electrical',
    },
    categories: ['Guides & Tutorials'],
    tags: ['cable lugs', 'copper', 'aluminium', 'bi-metallic', 'comparison'],
    readingTime: 7,
    seoTitle: 'Copper vs Aluminium Lugs: Complete Comparison Guide',
    seoDescription:
      'Compare copper and aluminium cable lugs. Learn when to use each type, understand bi-metallic connections, and avoid common mistakes.',
  },
  {
    id: 'cable-lug-size-chart',
    slug: 'understanding-cable-lug-size-charts',
    title: 'Understanding Cable Lug Size Charts',
    excerpt:
      'How to read cable lug size charts and select the correct lug for your cable size. Includes standard sizes and hole diameter guide.',
    content: `
      <h2>Cable Lug Sizing Basics</h2>
      <p>Selecting the correct cable lug size is crucial for safe and efficient electrical connections. This guide explains how to read size charts and make the right choice.</p>

      <h2>Key Dimensions</h2>

      <h3>1. Cable Size (sq mm)</h3>
      <p>The cross-sectional area of the conductor, measured in square millimeters. Common sizes:</p>
      <ul>
        <li><strong>Small:</strong> 1.5, 2.5, 4, 6 sq mm</li>
        <li><strong>Medium:</strong> 10, 16, 25, 35, 50 sq mm</li>
        <li><strong>Large:</strong> 70, 95, 120, 150, 185, 240, 300 sq mm</li>
        <li><strong>Extra Large:</strong> 400, 500, 630 sq mm</li>
      </ul>

      <h3>2. Hole Size (mm)</h3>
      <p>The mounting hole diameter on the lug palm. Industry standard hole sizes:</p>
      <table>
        <thead>
          <tr>
            <th>Cable Size (sq mm)</th>
            <th>Standard Hole Size (mm)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1.5 - 2.5</td><td>4 - 5</td></tr>
          <tr><td>4 - 6</td><td>6</td></tr>
          <tr><td>10 - 16</td><td>8</td></tr>
          <tr><td>25 - 50</td><td>10</td></tr>
          <tr><td>70 - 95</td><td>12</td></tr>
          <tr><td>120 - 150</td><td>14</td></tr>
          <tr><td>185</td><td>16</td></tr>
          <tr><td>240 - 300</td><td>17</td></tr>
          <tr><td>400 - 630</td><td>21</td></tr>
        </tbody>
      </table>

      <h3>3. Barrel Dimensions</h3>
      <ul>
        <li><strong>Inside Diameter:</strong> Must accommodate the conductor strands</li>
        <li><strong>Barrel Length:</strong> Short, medium, or long barrel options</li>
      </ul>

      <h2>Understanding Catalog Numbers</h2>
      <p>Dowell's catalog numbers encode the lug specifications:</p>

      <h3>CUS Series (Copper Medium Duty)</h3>
      <p>Example: <code>CUS-17</code></p>
      <ul>
        <li>CUS = Copper Tube Terminal Medium Duty</li>
        <li>17 = Sequential product number (70 sq mm, 12mm hole)</li>
      </ul>

      <h3>CBS Series (Copper Heavy Duty)</h3>
      <p>Example: <code>CBS-27</code></p>
      <ul>
        <li>CBS = Copper Tube Terminal Heavy Duty BS4579</li>
        <li>Designed for heavy-duty crimping</li>
      </ul>

      <h2>Sector vs Round Conductors</h2>
      <p>For cables above 16 sq mm, conductors may be sector-shaped:</p>
      <ul>
        <li><strong>Round conductors:</strong> Use standard tube terminals</li>
        <li><strong>Sector conductors:</strong> Use sector-specific lugs for proper contact</li>
      </ul>

      <h2>3.5 Core Cable Special Case</h2>
      <p>For 3.5 core cables with reduced neutral:</p>
      <ul>
        <li>3 phases at full size (e.g., 70 sq mm)</li>
        <li>1 neutral at half size (e.g., 35 sq mm)</li>
        <li>Order lugs in both sizes!</li>
      </ul>

      <h2>Quick Selection Tips</h2>
      <ol>
        <li>Always match lug size to cable cross-section</li>
        <li>Check bolt size on your busbar for hole diameter</li>
        <li>Choose barrel length based on crimping tool capability</li>
        <li>For sector cables, specify conductor shape when ordering</li>
      </ol>

      <p>Use our <a href="/quote-generator">Quote Generator</a> for automatic size matching based on your cable specifications.</p>
    `,
    publishedAt: '2024-11-05',
    author: {
      name: 'Pride Electrical Team',
      bio: 'Technical experts at Pride Electrical',
    },
    categories: ['Guides & Tutorials'],
    tags: ['cable lugs', 'size chart', 'specifications', 'selection guide'],
    readingTime: 6,
    seoTitle: 'Cable Lug Size Chart Guide | How to Select the Right Size',
    seoDescription:
      'Learn how to read cable lug size charts. Understand cable sizes, hole diameters, and barrel dimensions for correct lug selection.',
  },
  {
    id: 'calculate-cable-accessories',
    slug: 'how-to-calculate-cable-accessories',
    title: 'How to Calculate Cable Accessories for Your Project',
    excerpt:
      'Step-by-step guide to calculating the right quantities of cable lugs and glands for electrical projects using the core multiplier formula.',
    content: `
      <h2>Introduction</h2>
      <p>Calculating the correct quantities of cable accessories is essential for project planning and cost estimation. This guide covers the formulas and methods used by electrical professionals.</p>

      <h2>The Core Multiplier Formula</h2>
      <p>The fundamental formula for calculating cable lug quantities:</p>

      <div style="background: #f0f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <code style="font-size: 1.2em;">Lugs Required = Number of Cable Ends × Number of Cores</code>
      </div>

      <h3>Examples</h3>
      <table>
        <thead>
          <tr>
            <th>Cable Type</th>
            <th>Cable Ends</th>
            <th>Cores</th>
            <th>Lugs Needed</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Single Core</td><td>10</td><td>1</td><td>10</td></tr>
          <tr><td>3 Core</td><td>10</td><td>3</td><td>30</td></tr>
          <tr><td>4 Core</td><td>10</td><td>4</td><td>40</td></tr>
        </tbody>
      </table>

      <h2>3.5 Core Cable Special Calculation</h2>
      <p>For 3.5 core cables with reduced neutral:</p>

      <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Full-size lugs:</strong> Cable Ends × 3</p>
        <p><strong>Half-size lugs:</strong> Cable Ends × 1</p>
        <p><strong>Half-size =</strong> Cable Size ÷ 2</p>
      </div>

      <h3>Example: 70 sq mm, 3.5 core, 10 cables</h3>
      <ul>
        <li>70 sq mm lugs: 10 × 3 = 30 pieces</li>
        <li>35 sq mm lugs: 10 × 1 = 10 pieces</li>
        <li>Total: 40 lugs</li>
      </ul>

      <h2>Cable Gland Calculation</h2>
      <p>Cable glands are simpler:</p>

      <div style="background: #f0f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <code style="font-size: 1.2em;">Glands Required = Number of Cable Entry Points</code>
      </div>

      <p>Usually 1 gland per cable, but consider:</p>
      <ul>
        <li>Both ends if terminating in junction boxes</li>
        <li>One end if terminating on open busbars</li>
        <li>Extra 5-10% for spares</li>
      </ul>

      <h2>Complete Project Calculation Example</h2>
      <p><strong>Project:</strong> Panel board with 20 incoming cables</p>
      <ul>
        <li>10 × 4 core 25 sq mm cables</li>
        <li>5 × 3.5 core 70 sq mm cables</li>
        <li>5 × single core 95 sq mm cables</li>
      </ul>

      <h3>Lugs Calculation</h3>
      <ul>
        <li>25 sq mm lugs: 10 cables × 4 cores = 40 pieces</li>
        <li>70 sq mm lugs: 5 cables × 3 cores = 15 pieces</li>
        <li>35 sq mm lugs: 5 cables × 1 core = 5 pieces</li>
        <li>95 sq mm lugs: 5 cables × 1 core = 5 pieces</li>
      </ul>

      <h3>Glands Calculation</h3>
      <p>Total cable entries: 20 glands</p>

      <h2>Pro Tips</h2>
      <ol>
        <li><strong>Add 10% spare:</strong> Always order extras for crimping practice and replacements</li>
        <li><strong>Check both ends:</strong> Some cables terminate differently at each end</li>
        <li><strong>Verify sizes early:</strong> Confirm cable specs before ordering</li>
        <li><strong>Consider bi-metallic:</strong> Needed for Al cable to Cu busbar connections</li>
      </ol>

      <h2>Automate Your Calculations</h2>
      <p>Our <a href="/quote-generator">Quote Generator</a> automatically calculates quantities using these formulas. Simply enter your cable specifications and get an instant quote with all accessories.</p>
    `,
    publishedAt: '2024-10-28',
    author: {
      name: 'Pride Electrical Team',
      bio: 'Technical experts at Pride Electrical',
    },
    categories: ['Guides & Tutorials', 'Tips & Tricks'],
    tags: ['calculation', 'project planning', 'core multiplier', 'quantities'],
    readingTime: 5,
    seoTitle: 'How to Calculate Cable Accessories | Core Multiplier Formula',
    seoDescription:
      'Learn to calculate cable lug and gland quantities using the core multiplier formula. Step-by-step guide with examples for project planning.',
  },
];

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What is the difference between weather proof and flame proof cable glands?',
    answer:
      'Weather proof cable glands provide IP68 protection against dust and water ingress, suitable for standard industrial and outdoor applications. Flame proof (Ex d) glands are designed for hazardous areas with explosive atmospheres (Zone 1 & 2), featuring robust construction that can contain an internal explosion without igniting the surrounding atmosphere.',
    category: 'Cable Glands',
  },
  {
    id: 'faq-2',
    question: 'How do I select the correct cable lug size?',
    answer:
      'Match the lug size to your cable cross-section (sq mm). Check the hole size based on your busbar bolt size. For sector-shaped conductors, use sector-specific lugs. Our Quote Generator can help you select the right lug automatically based on your cable specifications.',
    category: 'Cable Lugs',
  },
  {
    id: 'faq-3',
    question: 'When should I use bi-metallic cable lugs?',
    answer:
      'Use bi-metallic lugs when connecting aluminium cables to copper busbars. Direct aluminium-to-copper contact causes galvanic corrosion over time. Bi-metallic lugs have an aluminium barrel (for the cable) friction-welded to a copper palm (for the busbar), preventing corrosion.',
    category: 'Cable Lugs',
  },
  {
    id: 'faq-4',
    question: 'What is the core multiplier formula for cable lugs?',
    answer:
      'The formula is: Lugs Required = Number of Cable Ends × Number of Cores. For example, 10 four-core cables need 40 lugs (10 × 4). For 3.5 core cables, calculate 3 full-size lugs plus 1 half-size lug per cable end.',
    category: 'General',
  },
  {
    id: 'faq-5',
    question: 'Do you provide bulk discounts?',
    answer:
      'Yes, Pride Electrical offers competitive bulk pricing for project orders. The larger the quantity, the better the discount. Contact our sales team with your requirements for a customized quote.',
    category: 'Orders & Pricing',
  },
  {
    id: 'faq-6',
    question: 'What crimping tools do you recommend?',
    answer:
      'We stock Dowell\'s range of crimping tools including hydraulic crimpers for large sizes (50-630 sq mm) and mechanical crimpers for smaller sizes. The tool selection depends on your lug series and size range. Our team can recommend the right tool for your needs.',
    category: 'Tools',
  },
  {
    id: 'faq-7',
    question: 'How quickly can you deliver orders?',
    answer:
      'Standard items from our Hyderabad warehouse ship within 1-2 business days. Delivery time depends on your location: 2-3 days for metro cities, 4-5 days for other areas. Express shipping is available for urgent requirements.',
    category: 'Orders & Pricing',
  },
  {
    id: 'faq-8',
    question: 'Are Dowell\'s products ISI certified?',
    answer:
      'Yes, Dowell\'s cable lugs and glands are manufactured to Indian and international standards including IS, BS, and DIN specifications. Products carry relevant certifications for quality assurance.',
    category: 'General',
  },
];

// Get all posts
export function getAllPosts(): BlogPost[] {
  return blogPosts;
}

// Get post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

// Get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) =>
    post.categories.some((c) => c.toLowerCase().includes(category.toLowerCase()))
  );
}

// Get all categories
export function getAllCategories(): BlogCategory[] {
  return blogCategories;
}

// Get all FAQs
export function getAllFaqs(): FAQ[] {
  return faqs;
}

// Get FAQs by category
export function getFaqsByCategory(category: string): FAQ[] {
  return faqs.filter((faq) => faq.category === category);
}
