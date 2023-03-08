<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <a href="#" class="brand-link"  style="text-decoration: none;">
            <img src="dist/img/avatar5.png" alt="" class="brand-image img-circle elevation-3">
            <span class="brand-text font-weight-light">Perpustakaan</span>
        </a>
        
        <!-- Sidebar -->
        <div class="sidebar">             

        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-tachometer-alt"></i>
                        <p>Dashboard</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="/siswa" class="nav-link">
                        <i class="nav-icon fas fa-user-friends"></i>
                        <p>Siswa</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="/buku" class="nav-link">
                        <i class="nav-icon fas fa-book"></i>
                        <p>Buku</p>
                    </a>
                </li>
               <li class="nav-item">
                    <a href="/peminjaman" class="nav-link">
                    <i class="fas fa-file-export nav-icon"></i>
                    <p>Peminjaman</p>
                </a>
            </li>
        </ul>
        </nav>
        <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>
</template>

<script>
export default {
    
}
</script>